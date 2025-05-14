import { buildApp } from './app.js'


async function start (){
    const app = await buildApp()
    
    app.listen({ port: 3000 }, (err, address) => {
        if(err) {
            console.error(err);
            process.exit(1);
        }
        console.log(`Server listening at: ${address}`);
    });
}