const { syncDB } = require("../../tasks/sync-db");



describe('Prueba en Sync-DB', ()=>{
    test('debe de ejecutar 2 veces el proceso', ()=>{
        syncDB();
        const times = syncDB();
        console.log(times);
        console.log('Se llamo', times);

        expect(times).toBe(2);
    })
});