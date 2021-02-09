function UrlExists(url) {
    const img = new Image();
    img.src = url;
    return (img.height !== 80 && img.width !== 80);
}