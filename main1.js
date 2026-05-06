const { Client } = require('pg');

const client = new Client({
  host: 'localhost',         
  user: 'postgres',     
  password: '****', 
  database: 'API',   
  port: 5432,                 
});

async function syncApiToDatabase() {
    try {
    await client.connect();
    const response = await fetch('https://jsonplaceholder.typicode.com/users');
    const data = await response.json();

    const users = data.map(item => `('${item.id}', '${item.name}','${item.username}','${item.email}','${item.phone}')`).join(',');
    const adress = data.map(item => `('${item.address.street}', '${item.address.suite}','${item.address.city}','${item.address.zipcode}')`).join(',');
    const company = data.map(item => `('${item.company.name}', '${item.company.catchPhrase}','${item.company.bs}')`).join(',');


  await client.query(`INSERT INTO users (id, name, username,email,phone) VALUES ${users};
    INSERT INTO adress (street,suite,city,zipcode) VALUES ${adress};
    INSERT INTO company (name,catchPhrase,bs) VALUES ${company};`)


 } catch (err) {
        console.error('Ошибка:', err.stack);
    } finally {
        await client.end();}}
syncApiToDatabase();