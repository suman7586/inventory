/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

$(document).ready(function(){
    var count_products;
    var count_cat;
    var count_subcat;
    var output="";
    var output_cat='<option value="">Select Category</option>';
    var output_subcat="";
    var cat_id;
    var index;
    var total_price;
    var img;
    $.ajax({
        url:BASE_URL+'webservice',
        data:1,
        type:'post',
        success:function(resp){
            var obj = $.parseJSON(resp);
            if(obj.code === 100){
               count_products=obj.products_list.length;
               //console.log(count_products);
               if(count_products>0){
                   for(i=0;i<count_products;i++){
                       index=i+1;
                       total_price=obj.products_list[i].cost_price+obj.products_list[i].rework_price+obj.products_list[i].courier_price;
                       img='<img src="'+BASE_URL+'assets/uploadfiles/upload_files/thumbs/100X100_'+obj.products_list[i].image+'" alt=""/>';
                      //console.log(obj.products_list[i].sku);
                      output+='<tr><td class="table-sub-title">'+index+'</td><td>'+obj.products_list[i].sku+'</td><td>'+obj.products_list[i].category+'</td><td>'+obj.products_list[i].subcategory+'</td><td>'+total_price+'</td><td>'+img+'</td><td><a href="jabvascript:void(0);" id="'+obj.products_list[i].product_id+'" url="product_view.html" class-"view">View</a>  <a href="jabvascript:void(0);" id="'+obj.products_list[i].product_id+'" url="product_edit.html" class-"edt">Edit</a>  <a href="jabvascript:void(0);" id="'+obj.products_list[i].product_id+'" url="product_del.html" class-"del">Delete</a></td></tr>';
                   }
                   $('#prod').after(output);
               }
            }else if(obj.code!=100){
                alert(obj.msg);
            }
        }
    });
    $(".price").live('keydown',function (event) {
	
	
				if (event.shiftKey == true) {
					event.preventDefault();
				}
		
				if ((event.keyCode >= 48 && event.keyCode <= 57) || 
					(event.keyCode >= 96 && event.keyCode <= 105) || 
					event.keyCode == 8 || event.keyCode == 9 || event.keyCode == 37 ||
					event.keyCode == 39 || event.keyCode == 46 || event.keyCode == 190) {
		
				} else {
					event.preventDefault();
				}
		
				if($(this).val().indexOf('.') !== -1 && event.keyCode == 190)
					event.preventDefault(); 
				//if a decimal has been added, disable the "."-button
	
				});
                                $.ajax({
                                   url:BASE_URL+'webservice/extract_category', 
                                   data:1,
                                   type:'post',
                                   success:function(resp){
                                      var obj = $.parseJSON(resp); 
                                      count_cat=obj.length;
                                     // console.log(count_cat);
                                     if(count_cat>0){
                                         for(i=0;i<count_cat;i++){
                                           output_cat+='<option value="'+obj[i].category_id+'">'+obj[i].category_name+'</option>';  
                                         }
                                         $('.category').html(output_cat);
                                     }
                                   }
                                });
                                $('.category').change(function(){
                                    cat_id=$(this).val();
                                    //console.log('cat:'+cat_id);
                                    
                                    $.ajax({
                                   url:BASE_URL+'webservice/extract_sub_category', 
                                   data:{'cat_id':cat_id},
                                   type:'post',
                                   success:function(resp){
                                      var obj = $.parseJSON(resp); 
                                      count_subcat=obj.length;
                                     // console.log(count_cat);
                                     if(count_cat>0){
                                         for(i=0;i<count_subcat;i++){
                                           output_subcat+='<option value="'+obj[i].sub_category_id+'">'+obj[i].sub_category_name+'</option>';  
                                         }
                                         $('.subcategory').html(output_subcat);
                                     }
                                   }
                                });
                                });
    $("form").submit(function(){
    //alert("Submitted");
    var formData = new FormData($('.productForm')[0]);

    $.ajax({
        url: BASE_URL+'webservice/productSubmit',
        type: 'POST',
        data: formData,
        async: false,
        success: function (data) {
            alert("Product Submitted successfully");
            window.location.href="index.html";
        },
        cache: false,
        contentType: false,
        processData: false
    });

    return false;
}); 
});



