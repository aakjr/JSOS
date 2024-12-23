var fs = {
    "name": "/",
    "type": "directory",
    "contents": [
        {
            "name": "init",
            "type": "file",
            "contents": "window.kernel_init = async () => {window.processes = [];window.processes.push({ 'pid': '1', 'location': '/' });if (typeof (fs) == 'object' && fs.contents) {document.body.innerHTML += `\n[ .. ] Loading essential libraries`;var slashlibindex = fs.contents.findIndex(obj => obj.name == 'lib' && obj.type == 'directory');if (slashlibindex !== -1) {document.body.innerHTML += ` (/lib)`;try {await fs.contents[slashlibindex].contents.forEach(async library => {await eval(library.contents);document.body.innerHTML += `\n[ <span class='t'>OK</span> ] Loaded '${library.name}'`;});}catch (err) {document.body.innerHTML = document.body.innerHTML.replace(`\n[ .. ] Loading essential libraries`, `\n[ <span class='f'>NO</span> ] Error loading essential libraries`);return;}document.body.innerHTML = document.body.innerHTML.replace(`\n[ .. ] Loading essential libraries`, `\n[ <span class='t'>OK</span> ] Loaded essential libraries`);document.body.innerHTML += `\n[ .. ] Loading Shell`;var slashbinindex = fs.contents.findIndex(obj => obj.name == 'bin' && obj.type == 'directory');if (slashbinindex !== -1) {var jshindex = fs.contents[slashbinindex].contents.findIndex(obj => obj.name == 'sh' && obj.type == 'file');if (jshindex !== -1) {document.body.innerHTML += `\n\n`;eval(fs.contents[slashbinindex].contents[jshindex].contents);window.processes.push({ 'pid': window.nextpid(), 'location': '/bin/sh' });document.body.innerHTML = document.body.innerHTML.replace(`\n[ .. ] Loading Shell`, `\n[ <span class='t'>OK</span> ] Shell loaded`);}else {document.body.innerHTML = document.body.innerHTML.replace(`\n[ .. ] Loading Shell`, `\n[ <span class='f'>NO</span> ] Shell missing (/bin/sh not found)`);return;}}else {document.body.innerHTML = document.body.innerHTML.replace(`\n[ .. ] Loading Shell`, `\n[ <span class='f'>NO</span> ] Binaries directory missing (/bin not found)`);return;}}else {document.body.innerHTML += `\n[ <span class='f'>NO</span> ] Libraries directory missing (/lib not found)`;return;}}else {document.body.innerHTML += `\n[ <span class='f'>NO</span> ] Filesystem error`;return;}}"
        },
        {
            "name": "bin",
            "type": "directory",
            "contents": [
                {
                    "name": "clear",
                    "type": "file",
                    "contents": "document.body.innerHTML = null;"
                },
                {
                    "name": "reboot",
                    "type": "file",
                    "contents": "window.location.reload();"
                },
                {
                    "name": "alias",
                    "type": "file",
                    "contents": "switch(args.length) {case 0: ALIASES.forEach(alias => { stdout += `${alias.alias}='${alias.ref}'\\n`; }); break; case 1: if(ALIASES.findIndex(obj => obj.alias == args[0]) == -1) {break;} let obj = ALIASES[ALIASES.findIndex(obj => obj.alias == args[0])]; stdout = `${obj.alias}='${obj.ref}'`; break; default: ALIASES.push({ alias: args[0], ref: args.slice(1).join(' ') });}"
                },
                {
                    "name": "echo",
                    "type": "file",
                    "contents": "stdout = args.join(' ');"
                },
                {
                    "name": "pwd",
                    "type": "file",
                    "contents": "stdout = PWD;"
                },
                {
                    "name": "exit",
                    "type": "file",
                    "contents": "window.processes.splice(window.processes.findIndex(process => process.location === '/bin/sh'), 1);"
                },
                {
                    "name": "ls",
                    "type": "file",
                    "contents": "if (args.length == 0) { stdout = pathToNode(PWD).contents.map(obj => obj.name).join(' ') } else { stdout = ''; args.forEach(dir => { if (doesExist(findRelativePath(dir), 'directory').exists) { stdout += `\\n\\n${dir}:\\n` + pathToNode(findRelativePath(dir)).contents.map(obj => obj.name).join(' ') } else { stdout = doesExist(findRelativePath(dir), 'directory').message; } }); };"
                },
                {
                    "name": "cd",
                    "type": "file",
                    "contents": "if (args.length == 0) { args.push(homedir); } if(doesExist(findRelativePath(args[0]), 'directory').exists) {PWD = findRelativePath(args[0]);} else {stdout = doesExist(findRelativePath(args[0]), 'directory').message;}"
                },
                {
                    "name": "cat",
                    "type": "file",
                    "contents": "if(doesExist(findRelativePath(args[0]), 'file').exists) {stdout = pathToNode(findRelativePath(args[0])).contents;} else {stdout = doesExist(findRelativePath(args[0]), 'file').message;}"
                },
                {
                    "name": "touch",
                    "type": "file",
                    "contents": "if(doesExist(parentDirOf(findRelativePath(args[0])), 'directory').exists) {if(!doesExist(findRelativePath(args[0]), 'file').exists) {pathToNode(parentDirOf(findRelativePath(args[0]))).contents.push({ name: fileOfPath(args[0]), type: 'file', contents: '' })}} else {stdout = doesExist(parentDirOf(findRelativePath(args[0])), 'directory').message;}"
                },
                {
                    "name": "nano",
                    "type": "file",
                    "contents": "setTimeout(() => {window.removeEventListener('keydown', window.shreturn);}); if(!args[0]) {stdout = 'Provide file name'; setTimeout(() => {window.addEventListener('keydown', window.shreturn);});} else {if(doesExist(parentDirOf(findRelativePath(args[0])), 'directory').exists) {document.body.style.overflowY = 'hidden';window.removeEventListener('click', focuslastinp);const temp = document.body.innerHTML;document.body.innerHTML = `<textarea class='texteditor'>${doesExist(findRelativePath(args[0]), 'file').exists ? pathToNode(findRelativePath(args[0])).contents : ''}</textarea>`;setTimeout(() => {window.scrollTo(0, 0);document.querySelector('.texteditor').focus();}, 10);window.addEventListener('keydown', function handleTextEditorShortcuts(keyE) {if(keyE.ctrlKey && keyE.key === 's') {keyE.preventDefault();if (!doesExist(findRelativePath(args[0]), 'file').exists) {pathToNode(parentDirOf(findRelativePath(args[0]))).contents.push({name: fileOfPath(args[0]), type: 'file', contents: document.querySelector('.texteditor').value });} else {pathToNode(findRelativePath(args[0])).contents = document.querySelector('.texteditor').value;}} if(keyE.key === 'Escape' || keyE.key === 'GoBack') {keyE.preventDefault();window.removeEventListener('keydown', handleTextEditorShortcuts);window.addEventListener('click', focuslastinp);document.body.innerHTML = temp + '\\n'; document.body.style.overflowY = 'auto';NewCommandLine();focuslastinp();setTimeout(() => {window.addEventListener('keydown', window.shreturn);});}}); } else {stdout = doesExist(parentDirOf(findRelativePath(args[0])), 'directory').message; setTimeout(() => {window.addEventListener('keydown', window.shreturn);});}};"
                },
                {
                    "name": "mkdir",
                    "type": "file",
                    "contents": "if(doesExist(parentDirOf(findRelativePath(args[0])), 'directory').exists) {if(!doesExist(findRelativePath(args[0]), 'directory').exists) {pathToNode(parentDirOf(findRelativePath(args[0]))).contents.push({name: fileOfPath(args[0]), type: 'directory', contents: [] })}} else {stdout = doesExist(parentDirOf(findRelativePath(args[0])), 'directory').message;}"
                },
                {
                    "name": "rm",
                    "type": "file",
                    "contents": "if(doesExist(parentDirOf(findRelativePath(args[0])), 'directory').exists) {if(doesExist(findRelativePath(args[0]), 'any').exists) {pathToNode(parentDirOf(findRelativePath(args[0]))).contents.splice([pathToNode(parentDirOf(findRelativePath(args[0]))).contents.findIndex(obj => obj.name == fileOfPath(args[0]) && obj.type == pathToNode(findRelativePath(args[0])).type)], 1);} else {stdout = doesExist(findRelativePath(args[0]), 'any').message;}}"
                },
                {
                    "name": "cp",
                    "type": "file",
                    "contents": "if(doesExist(findRelativePath(args[0]), 'any').exists) {if(doesExist(parentDirOf(findRelativePath(args[1])), 'directory').exists) {pathToNode(parentDirOf(findRelativePath(args[1]))).contents.push({name: fileOfPath(args[1]), type: pathToNode(findRelativePath(args[0])).type, contents: pathToNode(findRelativePath(args[0])).contents });} else {stdout = doesExist(parentDirOf(findRelativePath(args[1])), 'directory').message;}} else {stdout = doesExist(findRelativePath(args[0]), 'any').message;}"
                },
                {
                    "name": "mv",
                    "type": "file",
                    "contents": "if(doesExist(findRelativePath(args[0]), 'any').exists) {if(doesExist(parentDirOf(findRelativePath(args[1])), 'directory').exists) {pathToNode(parentDirOf(findRelativePath(args[1]))).contents.push({name: fileOfPath(args[1]), type: pathToNode(findRelativePath(args[0])).type, contents: pathToNode(findRelativePath(args[0])).contents }); pathToNode(parentDirOf(findRelativePath(args[0]))).contents.splice([pathToNode(parentDirOf(findRelativePath(args[0]))).contents.findIndex(obj => obj.name == fileOfPath(args[0]) && obj.type == pathToNode(findRelativePath(args[0])).type)], 1);} else {stdout = doesExist(parentDirOf(findRelativePath(args[1])), 'directory').message;}} else {stdout = doesExist(findRelativePath(args[0]), 'any').message;}"
                },
                {
                    "name": "js",
                    "type": "file",
                    "contents": "stdout = eval(args.join(' '));"
                },
                {
                    "name": "jpm",
                    "type": "file",
                    "contents": "switch (args[0] ? args[0].trim() : '') { case '': case 'help': stdout = '-Version:\\njpm 0.1\\n\\n-Operations:\\nupdate\\ninstall\\nhelp'; break; case 'update': break; default: stdout = `${args[0]}: invalid operation`; break; }"
                },
                {
                    "name": "sh",
                    "type": "file",
                    "contents": "document.styleSheets[0].insertRule('.input{ outline: none; color: white; }'); document.styleSheets[0].insertRule('.texteditor { width: 98vw; height: 98vh; margin: 0; border: none; resize: none; background: none; outline: none; color: inherit; font: inherit; overflow-wrap: break-word; }'); shvars = [{ 'name': 'USER', 'value': 'root' }, { 'name': 'HOST', 'value': (window.location.host ? window.location.host : 'localhost') }, { 'name': 'PWD', 'value': '' }, { 'name': 'PATH', 'value': '/bin:/usr/bin' }, { 'name': 'HOME', 'value': '' }, { 'name': 'ALIASES', 'value': 'quit=exit' } ]; window.shfvars = [{ name: '~', 'value': 'shvars[shvars.findIndex(shvar => shvar.name === `HOME`)].value' }, { 'name': './', 'value': 'shvars[shvars.findIndex(shvar => shvar.name === `PWD`)].value + \\'/\\'' }]; loadlib('/usr/lib/libdoese'); loadlib('/usr/lib/libpdo'); loadlib('/usr/lib/libfop'); loadlib('/lib/libsh'); setTimeout(() => { let usershvar = shvars[shvars.findIndex(shvar => shvar.name === `USER`)]; let homedirshvar = shvars[shvars.findIndex(shvar => shvar.name === `HOME`)]; homedirshvar.value = (usershvar.value === 'root' ? '/root' : `/home/${usershvar.value}`); shvars[shvars.findIndex(shvar => shvar.name === `PWD`)].value = homedirshvar.value; NewCommandLine(); focuslastinp(); window.addEventListener('click', focuslastinp); }); window.addEventListener('keydown', window.shreturn);"
                }
            ]
        },
        {
            "name": "lib",
            "type": "directory",
            "contents": [
                {
                    "name": "libptn",
                    "type": "file",
                    "contents": "window.pathToNode = (fullpath) => { if (fullpath == '/') { return fs; } if (fullpath.endsWith('/')) { fullpath = fullpath.slice(0, -1); } var res = 'fs'; var pathsegs = fullpath.split('/').slice(1); pathsegs.forEach((step, index) => { if (step.trim() == '') { res = 'undefined'; return; } if (step == '..') { if (index == 0) { res = 'undefined'; return; } else { res = res.split('.').slice(0, -1).join('.'); } } else { if (index == pathsegs.length - 1) { res += `.contents[${eval(res).contents.findIndex(obj => obj.name == step)}]`; } else { res += `.contents[${eval(res).contents.findIndex(obj => obj.name == step && obj.type == 'directory')}]`; } } if (eval(res) == undefined) { res = 'undefined'; return; } }); return eval(res); }"
                },
                {
                    "name": "libloadlib",
                    "type": "file",
                    "contents": "window.loadlib = (lib_name) => { try { eval(pathToNode(lib_name).contents); } catch (err) { return err; } return true; }"
                },
                {
                    "name": "libsh",
                    "type": "file",
                    "contents": "NewCommandLine = () => { const newline = document.createElement('span'); newline.className = 'input'; newline.contentEditable = 'true'; const marker = document.createElement('label'); marker.innerHTML = `$ `; document.body.appendChild(marker); document.body.appendChild(newline); document.body.appendChild(document.createElement('br')); }; focuslastinp = () => { var inputs = document.getElementsByClassName('input'); if (inputs.length == 0) { NewCommandLine(); } inputs = document.getElementsByClassName('input'); const lastinput = inputs[inputs.length - 1]; lastinput.focus(); moveCursorToEnd(lastinput); document.body.scrollTo(0, document.body.scrollHeight); }; moveCursorToEnd = (element) => { var range = document.createRange(); var selection = window.getSelection(); range.selectNodeContents(element); range.collapse(false); selection.removeAllRanges(); selection.addRange(range); }; HandleCommand = (stdin) => { if (!stdin.trim()) { return ''; }; let cmd = stdin.trim().split(' ')[0], args = stdin.trim().split(' ').slice(1); var runlocation = ''; var shvarloadcode = ''; shvars.forEach(shvar => { shvarloadcode += `${shvar.name} = '${shvar.value}' ; `; }); eval(shvarloadcode); if (cmd.includes('/')) { if (doesExist(findRelativePath(cmd), 'file').exists) { runlocation = findRelativePath(cmd); try { eval(pathToNode(runlocation).contents); } catch (err) { stdout = `[${runlocation}:${err.lineNumber}:${err.columnNumber}] ${err.message}`; }; var shvarsavecode = ''; shvars.forEach((shvar, i) => { shvarsavecode += `shvars[${i}].value = ${shvar.name} ; `; }); eval(shvarsavecode); } else { stdout = doesExist(findRelativePath(cmd), 'file').message; } return stdout; } else { var stdout = `${cmd}: command not found`; PATH = PATH.split(':'); PATH.forEach(path => { if (doesExist(`${path}/${cmd}`, 'file').exists) { stdout = ''; runlocation = `${path}/${cmd}`; return; } }); var aliasesplain = ALIASES.split(':'); ALIASES = []; aliasesplain.forEach(aliasplain => { ALIASES.push({ alias: aliasplain.split('=').slice(0, 1), ref: aliasplain.split('=').slice(1) }); }); var aliasfound = false; if (ALIASES.findIndex(obj => obj.alias == cmd) !== -1) { PATH.forEach(path => { if (!aliasfound) { if (doesExist(`${path}/${ALIASES[ALIASES.findIndex(obj => obj.alias == cmd)].ref}`, 'file').exists) { stdout = ''; runlocation = `${path}/${ALIASES[ALIASES.findIndex(obj => obj.alias == cmd)].ref}`; aliasfound = true; } else { stdout = `${ALIASES[ALIASES.findIndex(obj => obj.alias == cmd)].ref}: command not found`; } } }); }; try { eval(pathToNode(runlocation).contents); } catch (err) { stdout = `[${runlocation}:${err.lineNumber}:${err.columnNumber}] ${err.message}`; }; PATH = PATH.join(':'); ALIASES = ALIASES.map(obj => `${obj.alias}=${obj.ref}`).join(':'); var shvarsavecode = ''; shvars.forEach((shvar, i) => { shvarsavecode += `shvars[${i}].value = ${shvar.name} ; `; }); eval(shvarsavecode); return stdout; }; }; parseVars = (string) => { let res = string.replaceAll(/\\$\\w+/g, (match) => { let shvarindex = shvars.findIndex(shvar => shvar.name === match.slice(1)); if (shvarindex == -1) { return ''; } else { return shvars[shvarindex].value } }).replaceAll(/\\$\\{\\w+\\}/g, (match) => { let shvarindex = shvars.findIndex(shvar => shvar.name === match.slice(2, match.length - 1)); if (shvarindex == -1) { return ''; } else { return shvars[shvarindex].value } }); window.shfvars.forEach(fvar => { res = res.replaceAll(fvar.name, window.eval(fvar.value)); }); return res; }; window.printOutput = (output) => { const div = document.createElement('div'); div.innerText = output; div.innerHTML += '<br><br>'; document.body.appendChild(div); }; findRelativePath = (path) => { if (!path) { return PWD; } if (path == '/') { return '/'; } if (path.endsWith('/')) { path = path.slice(0, -1); } let res = (PWD == '/' ? PWD : path.startsWith('/') ? '' : PWD + '/') + path; const segments = res.split('/'); const stack = []; segments.forEach(segment => { if (segment === '..') { stack.pop(); } else if (segment !== '.' && segment !== '') { stack.push(segment); } }); res = '/' + stack.join('/'); if (res == '') { res = '/'; } return res; }; shreturn = async (event) => { if (event.key === 'Enter') { event.preventDefault(); let commands = event.target.innerText.split('&'); window.removeEventListener('keydown', shreturn); await commands.forEach(command => { printOutput(HandleCommand(parseVars(command))); }); if (window.processes.findIndex(process => process.location === '/bin/sh') !== -1) { window.addEventListener('keydown', shreturn); } NewCommandLine(); focuslastinp(); } };"
                },
                {
                    "name": "libsha256",
                    "type": "file",
                    "contents": "sha256 = async (input) => { const encoder = new TextEncoder(); const data = encoder.encode(input); const hashBuffer = await crypto.subtle.digest('SHA-256', data); const hashArray = Array.from(new Uint8Array(hashBuffer)); const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join(''); return hashHex; }"
                },
                {
                    "name": "libnextpid",
                    "type": "file",
                    "contents": "window.nextpid = () => {var highestpid = 1;window.processes.forEach(process => {if (process.pid > highestpid) {highestpid = process.pid;}});return highestpid + 1;}"
                }
            ]
        },
        {
            "name": "usr",
            "type": "directory",
            "contents": [
                {
                    "name": "bin",
                    "type": "directory",
                    "contents": [

                    ]
                },
                {
                    "name": "lib",
                    "type": "directory",
                    "contents": [
                        {
                            "name": "libdoese",
                            "type": "file",
                            "contents": "window.doesExist = (file, type) => { if (!file) { return { exists: false, message: 'Specify a file or directory' }; } if (file.endsWith('/') && file !== '/') { file = file.slice(0, -1); } if (!pathToNode(file)) { return { exists: false, message: `${file}: No such file or directory` }; } if (type !== 'file' && type !== 'directory') { return { exists: true, message: '' }; } if (type === eval(pathToNode(file)).type) { return { exists: true, message: '' }; } else if (type === 'file') { return { exists: false, message: `${file}: is a directory` }; } else { return { exists: false, message: `${file}: is not a directory` }; } }"
                        },
                        {
                            "name": "libpdo",
                            "type": "file",
                            "contents": "window.parentDirOf = (file) => {return file.split('/').slice(0, -1).join('/') == '' ? '/' : file.split('/').slice(0, -1).join('/');}"
                        },
                        {
                            "name": "libfop",
                            "type": "file",
                            "contents": "fileOfPath = (path) => { let pathSegmentsLength = path.split('/').length; return path.split('/')[pathSegmentsLength - 1] }"
                        }
                    ]
                }
            ]
        },
        {
            "name": "root",
            "type": "directory",
            "contents": [

            ]
        }
    ]
};

let init_file = fs.contents[fs.contents.findIndex(file => file.name === 'init' && file.type === 'file')];
eval(init_file.contents);