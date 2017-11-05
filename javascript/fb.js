$(document).ready(function()
{
  $('.loader').hide();
 var facebookToken = prompt("PLEASE ENTER THE FACEBOOK TOKEN");
  var img ;
  function getFacebookJson()
  {
    $.ajax('https://graph.facebook.com/me?fields=id,name,birthday,cover,age_range,favorite_athletes,favorite_teams,devices,email,education,inspirational_people,hometown,gender,interested_in,relationship_status,religion,friends,posts&access_token=' + facebookToken,
    {
      success: function(response)
      {
          jsonResponse = response;
          var hometown = response.hometown.name;
          var gender= response.gender;
          var relationship_status = response.relationship_status;
          $('.hometown').html(hometown);
          $('.gender').html(gender);
          $('.relationship').html(relationship_status);
          img = response.cover.source;
          console.log(img);
          $div = $('.profile-photo');

         $('<img />', {
           'src': img,
           'class': "myProfilePhoto" //put your class name here
          }).appendTo($div);

          $('.name').html(jsonResponse.name);
          $('.birthday').html(jsonResponse.birthday);
          $('.email').html(jsonResponse.email);
          var favorite_teams = jsonResponse.favorite_teams;
          var favorite_athletes = jsonResponse.favorite_athletes;
          var posts = jsonResponse.posts.data;
          console.log(posts);

          function showValueTeams(i,val)
          {
            $('.card-teams').append("<div class='card card-others'>"+val.name+"</div>");

          }
          jQuery.each(favorite_teams,showValueTeams);

          function showValueAtheletes(i,val)
          {
            $('.card-athelete').append("<div class='card card-others'>"+val.name+"</div>");
          }
          jQuery.each(favorite_athletes,showValueAtheletes);

          function showPosts(i,val)
          {
            var iPlusOne = i + 1;
            $('.data').append("<div class='container containAll'>");
            $('.data').append("<div class='card-posts postNumber'> <span class='post-title'>Post : "+iPlusOne+"</span></div>");
            $('.data').append("<div class='card card-posts id'> <span class='design-post-inner'>ID: </span> <span class='design-post-inner-value'> "+val.id+"</span></div>");
            $('.data').append("<div class='card card-posts story'> <span class='design-post-inner'>Story: </span> <span class='design-post-inner-value'> "+val.story+"</span></div>");
            $('.data').append("<div class='card card-posts created_time'> <span class='design-post-inner'>Created Time: </span><span class='design-post-inner-value'> "+val.created_time+"</span></div>");
            $('.data').append("</div>")
          }
          jQuery.each(posts,showPosts);
      },
      error: function(request,errorType,errorMesage)
      {
          console.log(request);
          console.log(errorType);
          alert(errorMesage + ", Kindly refresh.");
      },
      timeout: 10000,
      beforeSend: function()
      {
        $('.loader').show();
        $('.card').hide();
      },
      complete: function()
      {
        $('.loader').hide(100);
        $('.card').show(100);
      }
    });
  }
  $(window).on('load',getFacebookJson);
  $(window).on('load',function()
  {
        $('.feeds').hide();
        $('.backBtn').hide();
  });
  $('.feed').on('click',function()
  {
       $('.profile-photo').hide(100);
       $('.about-info').hide(100);
       $('.others').hide(100);
       $('.feeds').show(100);
       $('.backBtn').show(100);
       $('.feed').hide(100);
  });
  $('.backBtn').on('click',function()
  {
       $('.profile-photo').show(100);
       $('.about-info').show(100);
       $('.others').show(100);
       $('.feeds').hide(100);
       $('.backBtn').hide(100);
       $('.feed').show(100);
  });

});
