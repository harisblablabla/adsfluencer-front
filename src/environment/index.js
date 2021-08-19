var api;
if(window.location.hostname === 'localhost'){
     api = 'http://api.meylendra.com:2021';
}else if(window.location.hostname === "diendorse.siapptn.com"){
     api = 'http://api.meylendra.com:2021';
}else{
     api = 'https://diendorse.appspot.com';
}
export const koneksi = `${api}`