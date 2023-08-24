const fs = require('fs');

const homesData = require('./src/assets/homes.json');
 

const generateRoutes = (data) => {
  const routes = data.property.map(home => `/detail/${home.identifier.Id}`);
  return routes;
}

const routes = generateRoutes(homesData);

fs.writeFileSync('./routes-details.txt', routes.join('\n'), 'utf8');

console.log('routes-details.txt has been generated!');
