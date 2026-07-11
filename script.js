// BOOT SCREEN
setTimeout(() => {
    document.getElementById('bootScreen').classList.add('hidden');
}, 2000);

// CLOCK
function updateClock() {
    const now = new Date();
    const time = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false });
    const date = now.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
    document.getElementById('clock').textContent = `${date} ${time}`;
}
updateClock();
setInterval(updateClock, 1000);

// UPTIME
let startTime = Date.now();
function updateUptime() {
    const elapsed = Math.floor((Date.now() - startTime) / 1000);
    const hours = Math.floor(elapsed / 3600);
    const minutes = Math.floor((elapsed % 3600) / 60);
    document.getElementById('uptime').textContent = `${hours}h ${minutes}m`;
}
updateUptime();
setInterval(updateUptime, 60000);

// TERMINAL
const terminalOutput = document.getElementById('terminalOutput');
const terminalInput = document.getElementById('terminalInput');
const terminalBody = document.getElementById('terminalBody');

const commands = {
    help: () => `<span class="green">Available commands:</span>
<span class="cyan">about</span>       - Learn about me
<span class="cyan">projects</span>    - View my projects
<span class="cyan">skills</span>      - See my tech stack
<span class="cyan">experience</span>  - View my experience
<span class="cyan">certs</span>       - View certificates
<span class="cyan">certificates</span>- View certificates
<span class="cyan">contact</span>     - Get my contact info
<span class="cyan">cv</span>          - Open my CV
<span class="cyan">clear</span>       - Clear terminal
<span class="cyan">neofetch</span>    - System info
<span class="cyan">ls</span>          - List files
<span class="cyan">help</span>        - Show this help`,

    about: () => {
        openApp('about');
        return `<span class="green">Opening About...</span>`;
    },
    projects: () => {
        openApp('projects');
        return `<span class="green">Opening Projects...</span>`;
    },
    skills: () => {
        openApp('skills');
        return `<span class="green">Opening Skills...</span>`;
    },
    experience: () => {
        openApp('experience');
        return `<span class="green">Opening Experience...</span>`;
    },
    certs: () => {
        openApp('certificates');
        return `<span class="green">Opening Certificates...</span>`;
    },
    certificates: () => {
        openApp('certificates');
        return `<span class="green">Opening Certificates...</span>`;
    },
    contact: () => {
        openApp('contact');
        return `<span class="green">Opening Contact...</span>`;
    },
    cv: () => {
        window.open('cv.html', '_blank');
        return `<span class="green">Opening CV...</span>`;
    },
    clear: () => {
        terminalOutput.innerHTML = '';
        return '';
    },
    neofetch: () => `<span class="purple">        _____</span>         <span class="green">muluken@MulukenOS</span>
<span class="purple">       /     \\</span>        <span class="muted">-----------------</span>
<span class="purple">      | () () |</span>       <span class="green">OS:</span> MulukenOS 1.0
<span class="purple">      |  ___  |</span>       <span class="green">Kernel:</span> muluken-6.0-generic
<span class="purple">      |       |</span>       <span class="green">Shell:</span> bash 5.2.0
<span class="purple">       \\_____/</span>        <span class="green">WM:</span> Hyprland
<span class="purple">      /|     |\\</span>       <span class="green">Theme:</span> MulukenOS-Dark
<span class="purple">     / |     | \\</span>      <span class="green">Terminal:</span> muluken-term
<span class="purple">        |   |</span>         <span class="green">Degree:</span> BSc ECE (Great Distinction)
<span class="purple">        |   |</span>         <span class="green">Skills:</span> AI-Assisted Dev
<span class="muted">    MULUKEN OS v1.0</span>
<span class="yellow">    Built with AI assistance</span>`,

    ls: () => `<span class="cyan">About/</span>  <span class="cyan">Projects/</span>  <span class="cyan">Skills/</span>  <span class="cyan">Experience/</span>  <span class="cyan">Certificates/</span>  <span class="cyan">Contact/</span>  <span class="yellow">cv.pdf</span>`,

    whoami: () => `<span class="green">Muluken Shiferaw</span> - Electrical & Computer Engineer`,

    pwd: () => `<span class="green">/home/muluken/portfolio</span>`,

    uname: () => `<span class="green">MulukenOS 1.0 x86_64 GNU/Linux</span>`,

    date: () => `<span class="green">${new Date().toString()}</span>`,

    echo: (args) => `<span class="green">${args.join(' ')}</span>`
};

function processCommand(cmd) {
    const trimmed = cmd.trim().toLowerCase();
    const parts = trimmed.split(' ');
    const command = parts[0];
    const args = parts.slice(1);

    if (!command) return '';

    if (commands[command]) {
        return commands[command](args);
    }

    return `<span class="red">Command not found: ${command}</span>
<span class="muted">Type 'help' for available commands</span>`;
}

terminalInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        const cmd = terminalInput.value;
        const prompt = `<span class="green">muluken@MulukenOS:~$</span> ${cmd}`;
        
        let output = processCommand(cmd);
        
        if (output) {
            terminalOutput.innerHTML += `<p>${prompt}</p><p>${output}</p>`;
        } else {
            terminalOutput.innerHTML += `<p>${prompt}</p>`;
        }
        
        terminalInput.value = '';
        terminalBody.scrollTop = terminalBody.scrollHeight;
    }
});

// OPEN TERMINAL ON LOAD
setTimeout(() => {
    openApp('terminal');
    terminalInput.focus();
}, 2200);

// APP MANAGEMENT
const openApps = {};
const appDefaults = {
    terminal: { left: 'auto', top: '60px', right: '20px', width: '650px', height: '480px' },
    about: { left: '350px', top: '60px', width: '700px', height: '500px' },
    projects: { left: '350px', top: '60px', width: '700px', height: '500px' },
    skills: { left: '350px', top: '60px', width: '600px', height: '480px' },
    experience: { left: '350px', top: '60px', width: '650px', height: '500px' },
    certificates: { left: '350px', top: '60px', width: '600px', height: '500px' },
    contact: { left: '350px', top: '60px', width: '500px', height: '420px' }
};

function openApp(name) {
    const app = document.getElementById(`app-${name}`);
    if (!app) return;
    
    // Reset position to defaults
    const defaults = appDefaults[name];
    if (defaults) {
        app.style.left = defaults.left;
        app.style.top = defaults.top;
        app.style.width = defaults.width;
        app.style.height = defaults.height;
        if (defaults.right) {
            app.style.right = defaults.right;
        } else {
            app.style.right = 'auto';
        }
    }
    
    app.classList.add('active');
    app.classList.remove('minimized', 'maximized');
    app.style.zIndex = ++highestZ;
    openApps[name] = true;
    
    if (name === 'terminal') {
        terminalInput.focus();
    }
    
    updateTopbar();
}

function closeApp(name) {
    const app = document.getElementById(`app-${name}`);
    if (!app) return;
    
    app.classList.remove('active', 'maximized', 'minimized');
    
    // Reset inline styles
    const defaults = appDefaults[name];
    if (defaults) {
        app.style.left = defaults.left;
        app.style.top = defaults.top;
        app.style.width = defaults.width;
        app.style.height = defaults.height;
        if (defaults.right) {
            app.style.right = defaults.right;
        } else {
            app.style.right = 'auto';
        }
    }
    
    delete openApps[name];
    updateTopbar();
}

function minimizeApp(name) {
    const app = document.getElementById(`app-${name}`);
    if (!app) return;
    
    app.classList.add('minimized');
}

function maximizeApp(name) {
    const app = document.getElementById(`app-${name}`);
    if (!app) return;
    
    if (app.classList.contains('maximized')) {
        // Restore
        app.classList.remove('maximized');
        const defaults = appDefaults[name];
        if (defaults) {
            app.style.left = defaults.left;
            app.style.top = defaults.top;
            app.style.width = defaults.width;
            app.style.height = defaults.height;
            if (defaults.right) {
                app.style.right = defaults.right;
            } else {
                app.style.right = 'auto';
            }
        }
    } else {
        // Maximize
        app.classList.add('maximized');
        app.style.left = '0';
        app.style.top = '36px';
        app.style.width = '100%';
        app.style.height = 'calc(100vh - 36px)';
        app.style.right = '0';
    }
}

function updateTopbar() {
    const title = document.getElementById('topbarCenter');
    const appNames = Object.keys(openApps);
    
    if (appNames.length > 0) {
        const lastApp = appNames[appNames.length - 1];
        const names = {
            terminal: 'Terminal',
            about: 'About Me',
            projects: 'Projects',
            skills: 'Skills',
            experience: 'Experience',
            certificates: 'Certificates',
            contact: 'Contact'
        };
        title.textContent = names[lastApp] || lastApp;
    } else {
        title.textContent = 'Desktop';
    }
}

// DRAG FUNCTIONALITY
let isDragging = false;
let dragElement = null;
let dragOffsetX = 0;
let dragOffsetY = 0;

function startDrag(e, elementId) {
    const el = document.getElementById(elementId);
    if (el.classList.contains('maximized')) return;
    
    isDragging = true;
    dragElement = el;
    dragOffsetX = e.clientX - el.offsetLeft;
    dragOffsetY = e.clientY - el.offsetTop;
    el.style.zIndex = ++highestZ;
}

document.addEventListener('mousemove', (e) => {
    if (!isDragging || !dragElement) return;
    
    let newX = e.clientX - dragOffsetX;
    let newY = e.clientY - dragOffsetY;
    
    newX = Math.max(0, Math.min(newX, window.innerWidth - 100));
    newY = Math.max(36, Math.min(newY, window.innerHeight - 100));
    
    dragElement.style.left = newX + 'px';
    dragElement.style.top = newY + 'px';
});

document.addEventListener('mouseup', () => {
    isDragging = false;
    dragElement = null;
});

// ROFI LAUNCHER
function toggleRofi() {
    const rofi = document.getElementById('rofi');
    rofi.classList.toggle('active');
    
    if (rofi.classList.contains('active')) {
        document.getElementById('rofiInput').value = '';
        document.getElementById('rofiInput').focus();
        filterRofi();
    }
}

function filterRofi() {
    const input = document.getElementById('rofiInput').value.toLowerCase();
    const items = document.querySelectorAll('.rofi-item');
    
    items.forEach(item => {
        const text = item.textContent.toLowerCase();
        item.style.display = text.includes(input) ? 'flex' : 'none';
    });
}

// Close rofi when clicking outside
document.addEventListener('click', (e) => {
    const rofi = document.getElementById('rofi');
    if (!rofi.contains(e.target) && !e.target.closest('.dock-item')) {
        rofi.classList.remove('active');
    }
});

// KEYBOARD SHORTCUTS
document.addEventListener('keydown', (e) => {
    // Escape to close rofi or close top window
    if (e.key === 'Escape') {
        const rofi = document.getElementById('rofi');
        if (rofi.classList.contains('active')) {
            rofi.classList.remove('active');
        } else {
            // Close the topmost window
            const appNames = Object.keys(openApps);
            if (appNames.length > 0) {
                closeApp(appNames[appNames.length - 1]);
            }
        }
    }
    
    // Ctrl+` to focus terminal
    if (e.ctrlKey && e.key === '`') {
        e.preventDefault();
        openApp('terminal');
        terminalInput.focus();
    }
});

let highestZ = 300;

// CONKY ANIMATION
function animateConky() {
    const fills = document.querySelectorAll('.conky-fill');
    fills.forEach(fill => {
        const current = parseInt(fill.style.width);
        const change = (Math.random() - 0.5) * 4;
        const newWidth = Math.max(20, Math.min(90, current + change));
        fill.style.width = newWidth + '%';
    });
}

setInterval(animateConky, 2000);

console.log('MulukenOS loaded successfully');
