   $(function(){

	   var AllHet = $(window).height();

	   var mainHet= $('.right').height();

	   var fixedTop = (AllHet - mainHet)/2

	   $('div.right').css({top:fixedTop+'px'}); 


	   $(window).scroll(scrolls)

	   scrolls()

	   function scrolls(){

		   var f1,f2,f3;

		   var fixRight = $('div.right');

		   var sTop = $(window).scrollTop();

		   fl = $('.block1').offset().top;

		   f2 = $('.block2').offset().top;

		   f3 = $('.block3').offset().top;


		   var topPx = sTop+fixedTop

		    $('div.right').stop().animate({top:topPx});

			

		   

		   if(sTop>=fl){

			   fixRight.eq(0).addClass('cur').siblings().removeClass('cur');

			   }

		   if(sTop>=f2-100){

			   fixRight.eq(1).addClass('cur').siblings().removeClass('cur');

			   }

		   if(sTop>=f3-100){

			   fixRight.eq(2).addClass('cur').siblings().removeClass('cur');

			   }

		

	     }

	   })

