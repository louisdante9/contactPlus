#!/usr/bin/env node
import program from 'commander';
import { prompt } from 'inquirer'; // require inquirerjs library
import { addContact, getContact, updateContact, deleteContact, getContactList } from './controller';

// Craft questions to present to users
const questions = [
  {
    type : 'input',
    name : 'firstname',
    message : 'Enter firstname ...'
  },
  {
    type : 'input',
    name : 'lastname',
    message : 'Enter lastname ...'
  },
  {
    type : 'input',
    name : 'phone',
    message : 'Enter phone number ...'
  },
  {
    type : 'input',
    name : 'email',
    message : 'Enter email address ...'
  }
];

program
  .version('1.0.0')
  .description('Contact Diary');

program
  .command('addContact')
  .alias('a')
  .description('Add a contact')
  .action(() => {
    prompt(questions).then(answers => addContact(answers));
  });

program
  .command('getContact <name>')
  .alias('r')
  .description('Get contact')
  .action(name => getContact(name));

program
  .command('updateContact <phone_no>')
  .alias('u')
  .description('Update contact')
  .action(phone => prompt(questions).then(answers => updateContact(phone, answers)));

program
  .command('deleteContact <phone_no>')
  .alias('d')
  .description('Delete contact')
  .action(phone => deleteContact(phone));

program
  .command('getContactList')
  .option('-l, --limit <limit>', 'limit returned')
  .alias('l')
  .description('List contacts')
  .action((options) => getContactList(options.limit));



program.on('command:*', function () {
  console.error('Invalid command: %s\nSee --help for a list of available commands.', program.args.join(' '));
  process.exit(1);
});

program.parse(process.argv);
