INFRASTRUCTURE DECISION TOOL
INFO-300: IT Infrastructure

ABOUT
This Node.js program offers two tools: a Subnet Host Checker and a Compute Environment Selector. It uses readline-sync to collect user input, validates the answers, and allows the user to run the tools multiple times.

HOW TO RUN
1. Install Node.js.
2. Open a terminal in the project folder.
3. Run: npm install
4. Run: npm start
   (or: node index.js)
5. Choose tool 1 or 2 and follow the prompts.

SUBNET CHECKER EXAMPLE 1: SUFFICIENT
VPC CIDR: /16
Subnet CIDR: /24
Devices required: 200
Subnet is consistent: YES
Total IPs: 256
AWS reserved IPs: 5
Usable IPs: 251
Subnet sufficient: YES
Unused IPs: 51

SUBNET CHECKER EXAMPLE 2: NOT SUFFICIENT
VPC CIDR: /16
Subnet CIDR: /28
Devices required: 15
Subnet is consistent: YES
Total IPs: 16
AWS reserved IPs: 5
Usable IPs: 11
Subnet sufficient: NO
Additional IPs needed: 4

COMPUTE ENVIRONMENT GUIDELINES
- Fewer than 1,000 monthly users with no high availability: Single EC2
- From 1,000 to 10,000 monthly users without high availability: EC2 + Load Balancer
- More than 10,000 monthly users OR high availability required: EC2 + Load Balancer + Auto Scaling
- Budget below $1,000: Warning for any architecture beyond a single EC2
- Budget from $1,000 through $3,000: Warning when Auto Scaling is recommended

NOTES
- CIDR prefixes must be /16 through /30. A subnet prefix must be greater than or equal to its VPC prefix.
- This program checks CIDR prefix compatibility, not specific network address containment, because the assignment requests CIDR prefixes rather than full network addresses.
- AWS reserves five IP addresses in each subnet. For /30 (four total IPs), usable addresses are reported as zero, not a negative number.
- Enter CIDR prefixes as numbers without the slash. The program displays the slash in each prompt.
ADDITIONAL TESTING NOTES

I tested the program with different inputs to make sure
both tools were working correctly.

Test 1: Sufficient Subnet
VPC CIDR: /16
Subnet CIDR: /24
Devices: 200
Result: 251 usable IPs and 51 unused IPs.

Test 2: Insufficient Subnet
VPC CIDR: /16
Subnet CIDR: /28
Devices: 20
Result: 11 usable IPs and 9 additional IPs needed.

Test 3: Compute Environment
Application: VCU Student Portal
Monthly users: 15000
Monthly budget: $2000
High availability: Yes
Result: EC2 + Load Balancer + Auto Scaling.
The program correctly displayed a budget warning.