var base

if(window.location.host=='www.test.com'){
    base = 'http://api.test.com'
}else if(window.location.host=='admin.test.com'){
    base = 'http://api.test.com'
}else if(window.location.host=='pc.test.com'){
    base = 'http://api.test.com'
}else if(window.location.host=='testapi.zzflgs.cn'){
    base = 'http://testapi.zzflgs.cn'
}else if(window.location.host=='jkyr.yearnedu.com'){
    base = 'http://jkyr.yearnedu.com'
}else{
    base = 'http://testapi.zzflgs.cn'
}

export default base