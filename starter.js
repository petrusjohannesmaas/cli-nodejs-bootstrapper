const fs = require('fs');
const { exec } = require('child_process');
const path = require('path');
const inquirer = require('inquirer').default;

const templatesFolder = '/home/pjmaas/Templates/';

const startProject = async () => {
    try {
        // Prompt the user for project name and starter selection
        const answers = await inquirer.prompt([
            { type: 'input', name: 'projectName', message: 'What is your project name?' },
            {
                type: 'list',
                name: 'starter',
                message: 'Choose your starter project:',
                choices: ['FullStackStarter', 'APIStarter', 'CLIStarter', 'RelationalStarter'],
            },
        ]);

        const { projectName, starter } = answers;
        const starterPath = path.join(templatesFolder, `${starter}.zip`);
        const projectPath = path.resolve(process.cwd(), projectName);

        // Step 1: Create the project folder
        if (!fs.existsSync(projectPath)) {
            fs.mkdirSync(projectPath);
        }
        console.log(`Project folder created: ${projectName}`);

        // Step 2: Initialize Git repository
        exec(`git init ${projectPath}`, (gitErr) => {
            if (gitErr) {
                console.error('Failed to initialize Git repository:', gitErr.message);
                return;
            }
            console.log(`Git repository initialized in ${projectName}`);

            // Create README.md file
            const readmePath = path.join(projectPath, 'README.md');
            fs.writeFileSync(readmePath, `# ${projectName}\n\nStarter project initialized.`);
            console.log('README.md file created.');

            // Create .gitignore file
            const gitignorePath = path.join(projectPath, '.gitignore');
            fs.writeFileSync(gitignorePath, `node_modules\n.env\n`);
            console.log('.gitignore file created.');

            exec(`git -C ${projectPath} add . && git -C ${projectPath} commit -m "Initial commit"`, (commitErr) => {
                if (commitErr) {
                    console.error('Failed to commit initial files:', commitErr.message);
                } else {
                    console.log('Initial commit created.');
                }
            });
        });

        // Step 3: Unzip the starter project
        const unzipCommand = `unzip ${starterPath} -d ${projectPath}`;
        exec(unzipCommand, (unzipErr) => {
            if (unzipErr) {
                console.error(`Failed to unzip starter project (${starter}):`, unzipErr.message);
            } else {
                console.log(`Starter project (${starter}) unzipped into ${projectName}.`);
            }
        });
    } catch (err) {
        console.error('Error during project initialization:', err.message);
    }
};

startProject();