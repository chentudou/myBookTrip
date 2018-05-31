export default function viewMarker(markers, map, html, image, store) {　
    //console.log('markers, map, html, image, store',markers, map, html, image, store)
    this._markers = markers;
    this._div = null;
    this._html = html; //自定义参数
    this._image = image;
    this._store = store;
    this.setMap(map);
}
viewMarker.prototype = new google.maps.OverlayView();

viewMarker.prototype.onAdd = function () {
    var div = document.createElement('div');
    var divStr;
    for (var x = 0; x < this._html.length; x++) {
        divStr += `<div class="mapPopBox" style="z-index:99${x-0+1}"><div class="clearfix" style='position:relative'>
        <div class="mapMarker" id="marker_${x-0+1}" style="width: 28px;height: 35px;text-align: center;padding-top: 5px;cursor: pointer;
        font-size: 14px;color: #1493e3;display:inline-block;background:url('${this._image}');">${x-0+1}</div>
        ${this._html[x]}
        </div></div>`;
    }
    div.innerHTML = divStr.replace("undefined","");;
    var panes = this.getPanes();
    panes.overlayImage.appendChild(div);
    this._div = div;
}
viewMarker.prototype.draw = function () {
    //根据经纬度计算div的像素位置
    var pointArr = []
    for (var i = 0; i < this._markers.length; i++) {
        var latlng = new google.maps.LatLng(this._markers[i].axes[0], this._markers[i].axes[1]);
        var point = this.getProjection().fromLatLngToDivPixel(latlng);
        pointArr.push({
            pointX: point.x,
            pointY: point.y
        })
        var div = this._div;
        div.children[i].style.left = (pointArr[i].pointX - 20) + 'px'; //减掉marker宽度的一半，居中
        div.children[i].style.top = (pointArr[i].pointY - 50) + 'px'; //减掉marker高度的一半，居中
        div.children[i].style.position = 'fixed'; //减掉marker高度的一半，居中
        div.children[i].style.padding = '8px 2px 0';; //减掉marker高度的一半，居中
    }
    /* 点击出现 */
    let map = document.getElementById('map');
    map.addEventListener('mouseover', (e) => {
        var event = e || window.event;
        var target = event.target || event.srcElement;
        // 判断是否匹配目标元素
        if (target.className.toLowerCase() == 'mapmarker') {
            let poiPop=document.getElementById(`poi_${target.innerHTML}`);/* 当前整个弹框 */
            let addToTrip=document.getElementById(`addToTrip_${target.innerHTML}`);/* 当前弹框下的加号 */
            let popBox=poiPop.parentNode.parentNode;/* 包括弹框和marker点在内的整个盒子 */
            let currMarker=document.getElementById(`marker_${target.innerHTML}`);/* 当前marker点 */
            popBox.style.zIndex='9999';
            /* 在弹框上面 */
            poiPop.addEventListener("mouseover",(e)=>{
                popBox.style.zIndex='9999';
            });
            /* 离开弹框后 */
            poiPop.addEventListener("mouseout",(e)=>{
                popBox.style.zIndex=`99${target.innerHTML}`;
            });
            /* 点击弹框时 */
            poiPop.addEventListener("click",e=>{
                let showDetailData={
                    id:this._markers[target.innerHTML-1].id,
                    index:target.innerHTML-1,
                    type:this._markers[target.innerHTML-1].type
                }
                //console.log("点击弹框时",showDetailData)
                this._store.dispatch("showDetail", showDetailData ); 
            })
            /* 离开marker点时 */
            currMarker.addEventListener("mouseout",()=>{
                popBox.style.zIndex=`99${target.innerHTML}`;
            })
            /* 点击'加号'时 */
            addToTrip.addEventListener("click",e=>{
                //console.log(e.target.getAttribute("data-addtrip"));
                let addViewData={
                    id:this._markers[e.target.getAttribute("data-addtrip")].id,
                    index:e.target.getAttribute("data-addtrip"),
                    type:this._markers[e.target.getAttribute("data-addtrip")].type
                }
                //console.log("点击弹框时",addViewData)
                this._store.dispatch("addView",addViewData); 
                e.stopPropagation();
            })
        }else if (target.tagName.toLowerCase() == 'span'){
            //this._store.dispatch("showDetail", this._markers[target.getAttribute("data-addtrip")].id); 
            return;
        }
        return false;
    });
};
viewMarker.prototype.onRemove = function () {
    //this.div_.parentNode.removeChild(this.div_);
    this._div.parentNode.removeChild(this._div);
    this._div = null;
};