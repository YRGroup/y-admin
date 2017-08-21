var base

if(window.location.host=='www.test.com'){
    base = 'http://api.test.com'
}else if(window.location.host=='admin.test.com'){
    base = 'http://api.test.com'
}else if(window.location.host=='pc.test.com'){
    base = 'http://api.test.com'
}else{
    base = ''
}

export default base