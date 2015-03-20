jQuery(function(){
    jQuery("#d_clip_button").click(function(){
      jQuery(this).text("Share link has been copied.");
    });

    var clip = new ZeroClipboard($("#d_clip_button"));


    jQuery(".btn_share_job").click(function(){
        RemoteGenerateShareLink(this);
    });

    jQuery(".btn_apply_job").click(function(){
        RemoteCheckResume();
    });
});

function RemoteCheckResume(){
    var phone = jQuery("#node_phone").val();
    if (phone != ""){
        $.ajax({
            url: '../remote/check/resume',
            method: 'POST',
            data: {
                "telephone": phone
            },
            
            success: function(data) {
                if (!data.has_resume)
                {
                    NewResumeView();
                } else 
                {
                    if (!data.has_application)
                    {

                    }else
                    {

                    }
                }
            },
            error: function(data) {
            }

        });
    }else{
        jQuery("#node_phone").attr("placeholder",jQuery("#node_phone").attr("placeholder") + " could not be empty!");
    }
}

function NewResumeView(){
    jQuery(".play_content").show();
    jQuery(".play_user_infor").hide();
    window.scrollTo(0,jQuery(".play_content").offset().top-20);

    jjQuery(".has_resume").hide();
    jQuery(".new_resume").show();
    jQuery(".has_application").hide();    
}

function HasResumeView(){
    jQuery(".play_user_infor").hide();
    jQuery(".has_resume").show();
    jQuery(".new_resume").hide();
    jQuery(".has_application").hide();
}

function HasApplicationView(){
    jQuery(".play_user_infor").hide();
    jjQuery(".has_resume").hide();
    jQuery(".new_resume").hide();
    jQuery(".has_application").show();
}

function RemoteGenerateShareLink(this_button){

    var node_id = jQuery("#node_id").val();
    var node_job_id = jQuery("#node_job_id").val();
    var node_name = jQuery("#node_name").val();
    var node_phone = jQuery("#node_phone").val();

    if (node_phone != "")
    {
        $.ajax({
            url: './remote/share',
            method: 'POST',
            data: {
                "node_id": node_id,
                "job_id": node_job_id,
                "name": node_name,
                "telephone": node_phone
            },
            
            success: function(data) {
                var share_link = window.location.origin + "/spread/job/" + node_job_id + "?node_id=" + data.node_id;
                jQuery("#share_link_text").val(share_link);

                jQuery(".play_user_infor").hide();
                jQuery("#maskLayer").show();
                jQuery(".mask_remder").show();
            },
            error: function(data) {
            }

        });
    }else{
        //jQuery("#node_phone").parent().addClass("has-error");
        jQuery("#node_phone").attr("placeholder",jQuery("#node_phone").attr("placeholder") + " could not be empty!");
    }  

}