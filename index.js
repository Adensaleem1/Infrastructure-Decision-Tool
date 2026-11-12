const readline = require('readline-sync');

function readInteger(prompt, minimum, maximum) {
  while (true) {
    const answer = readline.question(prompt).trim();
    if (/^\d+$/.test(answer)) {
      const value = Number(answer);
      if (Number.isSafeInteger(value) && value >= minimum && value <= maximum) {
        return value;
      }
    }
    console.log(`Invalid input. Enter a whole number from ${minimum} to ${maximum}.`);
  }
}

function readMoney(prompt) {
  while (true) {
    const answer = readline.question(prompt).trim();
    if (/^(?:\d+)(?:\.\d{1,2})?$/.test(answer)) {
      const value = Number(answer);
      if (Number.isFinite(value) && value >= 0) return value;
    }
    console.log('Invalid budget. Enter a non-negative amount (example: 1500 or 1500.50).');
  }
}

function readYesNo(prompt) {
  while (true) {
    const answer = readline.question(prompt).trim().toLowerCase();
    if (answer === 'yes' || answer === 'y') return true;
    if (answer === 'no' || answer === 'n') return false;
    console.log('Please type yes or no.');
  }
}

function readName(prompt) {
  while (true) {
    const name = readline.question(prompt).trim();
    if (name.length > 0) return name;
    console.log('Application name cannot be empty.');
  }
}

function subnetHostChecker() {
  console.log('\n--- Subnet Host Checker ---');
  const vpcCidr = readInteger('Enter VPC CIDR prefix (16-30, e.g., 16): /', 16, 30);
  const subnetCidr = readInteger('Enter subnet CIDR prefix (16-30, e.g., 24): /', 16, 30);
  const devices = readInteger('Enter number of devices required: ', 1, Number.MAX_SAFE_INTEGER);

  if (subnetCidr < vpcCidr) {
    console.log(`Subnet /${subnetCidr} is NOT consistent with VPC /${vpcCidr}.`);
    console.log('The subnet prefix must be greater than or equal to the VPC prefix.');
    return;
  }

  console.log(`Subnet /${subnetCidr} is consistent with VPC /${vpcCidr}.`);
  const totalAddresses = 2 ** (32 - subnetCidr);
  const usableAddresses = Math.max(0, totalAddresses - 5);
  console.log(`Total subnet IP addresses: ${totalAddresses}`);
  console.log('AWS reserved addresses: 5');
  console.log(`Usable IP addresses: ${usableAddresses}`);

  if (usableAddresses >= devices) {
    console.log(`Sufficient: YES. Unused IP addresses: ${usableAddresses - devices}`);
  } else {
    console.log(`Sufficient: NO. Additional IP addresses needed: ${devices - usableAddresses}`);
  }
}

function computeEnvironmentSelector() {
  console.log('\n--- Compute Environment Selector ---');
  const appName = readName('Application name: ');
  const users = readInteger('Expected monthly users: ', 0, Number.MAX_SAFE_INTEGER);
  const budget = readMoney('Monthly budget in dollars: $');
  const highAvailability = readYesNo('High availability required? (yes/no): ');

  let architecture;
  if (users > 10000 || highAvailability) {
    architecture = 'EC2 + Load Balancer + Auto Scaling';
  } else if (users >= 1000) {
    architecture = 'EC2 + Load Balancer';
  } else {
    architecture = 'Single EC2';
  }

  console.log(`\nApplication: ${appName}`);
  console.log(`Recommended architecture: ${architecture}`);
  if (budget < 1000 && architecture !== 'Single EC2') {
    console.log('WARNING: Budget is under $1,000; this architecture requires more than a single EC2.');
  } else if (budget >= 1000 && budget <= 3000 && architecture.includes('Auto Scaling')) {
    console.log('WARNING: Budget is between $1,000 and $3,000; this architecture requires Auto Scaling.');
  } else {
    console.log('No budget warning for this recommendation.');
  }
}

function main() {
  console.log('Welcome to the Infrastructure Decision Tool!');
  let again = true;
  while (again) {
    console.log('\n1. Subnet Host Checker');
    console.log('2. Compute Environment Selector');
    const choice = readInteger('Select a tool (1 or 2): ', 1, 2);
    if (choice === 1) subnetHostChecker();
    else computeEnvironmentSelector();
    again = readYesNo('\nWould you like to run another tool? (yes/no): ');
  }
  console.log('Thanks for using the Infrastructure Decision Tool!');
}

main();
