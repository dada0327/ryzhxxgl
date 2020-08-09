/**
 * list.jsp 左侧抽屉
 */
  
//选项卡
  $(function(){
  	$(".tab dl dt>a:first").addClass("tabActive");
  	$(".tab dl dd ul").not(":first").hide();
  	$(".tab dl dt>a").unbind("click").bind("click", function(){
  		$(this).siblings("a").removeClass("tabActive").end().addClass("tabActive");
  		var index = $(".tab dl dt>a").index( $(this) );
  		$(".tab dl dd ul").eq(index).siblings(".tab dl dd ul").hide().end().fadeIn("slow");
     });
  });
  
//自动轮换选项卡
  $(document).ready(function(){
   $('.tab dl dt a:first').addClass('tabActive');
   $('.tab dl dd ul:first').css('display','block');
   autoroll();
   hookThumb();
  });
  var i=-1; //第i+1个tab开始
  var offset = 2500; //轮换时间
  var timer = null;
  function autoroll(){
   n = $('.tab dl dt a').length-1;
   i++;
   if(i > n){
   i = 0;
   }
   slide(i);
      timer = window.setTimeout(autoroll, offset);
   }
  function slide(i){
   $('.tab dl dt a').eq(i).addClass('tabActive').siblings().removeClass('tabActive');
   $('.tab dl dd ul').eq(i).fadeIn("slow").siblings('.tab dl dd ul').hide();
   }
  function hookThumb(){    
   $('.tab dl dt a').hover(
    function () {
      if (timer) {
                  clearTimeout(timer);
      i = $(this).prevAll().length;
               slide(i); 
              }
    },
    function () {
              timer = window.setTimeout(autoroll, offset);  
              this.blur();            
              return false;
    }
  ); 
  }