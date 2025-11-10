const bcrypt = require('bcrypt');

async function generateSeed() {
  return [
    {
      username: 'thisIsEmployeeNumOne',
      password: await bcrypt.hash('securePass123', 10),
      role: 'employee'
    },
    {
      username: 'thisIsEmployeeNumTwo',
      password: await bcrypt.hash('anotherPass456', 10),
      role: 'employee'
    }
  ];
}

module.exports = generateSeed;
