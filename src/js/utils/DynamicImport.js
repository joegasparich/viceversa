export default class DynamicImport {

    static get Materialize() {
        return new Promise(resolve=>{
            import(/* webpackChunkName: "materialize" */ 'materialize-css').then(M=>{
                resolve(M);
            });
        });
    }
}