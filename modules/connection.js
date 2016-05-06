var connectionString = '';

//if(process.env.DATABASE_URL !== undefined) {
//    connectionString = process.env.DATABASE_URL + 'ssl';
//} else {
//    connectionString = 'postgres://localhost:5432/lazy_days';
}

if(process.env.DATABASE_URL != undefined) {
    connectionString = process.env.DATABASE_URL + "?ssl=true";
} else {
    connectionString = 'postgres://tozsnlivczuaum:myvv9PpdKbsaNlGGpWNFc_JlOL@ec2-54-225-112-119.compute-1.amazonaws.com:5432/d5a81tjgl385eg?ssl=true';
}
//console.log(connectionString);
module.exports = connectionString;