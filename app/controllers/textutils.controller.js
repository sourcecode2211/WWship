'use strict';

angular.module('myApp.textUtils', [])

    .controller('textUtilsCtrl')

    textUtilsCtrl.$inject = ['$scope', 'PrimaryServices', '$state','$location','$sce'];

function textUtilsCtrl($scope, PrimaryServices, $state,$location,$sce) { 
    var _ = this, unicode_value, uv;
    _.convert_tscii_2_unicode = function() {
        unicode_value = _.v0;
        unicode_value = unicode_value.replace(/sr/g, "ஸ்ரீ");
        unicode_value = unicode_value.replace(/xau/g, "க்ஷௌ");
        unicode_value = unicode_value.replace(/xai/g, "க்ஷை");
        unicode_value = unicode_value.replace(/xaa/g, "க்ஷா");
        unicode_value = unicode_value.replace(/xA/g, "க்ஷா");
        unicode_value = unicode_value.replace(/xa/g, "க்ஷ");
        unicode_value = unicode_value.replace(/xii/g, "க்ஷீ");
        unicode_value = unicode_value.replace(/xi/g, "க்ஷி");
        unicode_value = unicode_value.replace(/xI/g, "க்ஷீ");
    
        unicode_value = unicode_value.replace(/xuu/g, "க்ஷூ");
        unicode_value = unicode_value.replace(/xu/g, "க்ஷு");
        unicode_value = unicode_value.replace(/xU/g, "க்ஷூ");
        unicode_value = unicode_value.replace(/xee/g, "க்ஷே");
        unicode_value = unicode_value.replace(/xe/g, "க்ஷெ");
        unicode_value = unicode_value.replace(/xE/g, "க்ஷே");
        unicode_value = unicode_value.replace(/xoo/g, "க்ஷோ");
        unicode_value = unicode_value.replace(/xo/g, "க்ஷொ");
        unicode_value = unicode_value.replace(/xO/g, "க்ஷோ");
    
    
        unicode_value = unicode_value.replace(/x/g, "க்ஷ்");
    
        unicode_value = unicode_value.replace(/njau/g, "ஞௌ");
        unicode_value = unicode_value.replace(/njai/g, "ஞை");
        unicode_value = unicode_value.replace(/njee/g, "ஞே");
        unicode_value = unicode_value.replace(/njoo/g, "ஞோ");
        unicode_value = unicode_value.replace(/njaa/g, "ஞா");
        unicode_value = unicode_value.replace(/njuu/g, "ஞூ");
        unicode_value = unicode_value.replace(/njii/g, "ஞீ");
        unicode_value = unicode_value.replace(/nja/g, "ஞ");
        unicode_value = unicode_value.replace(/nji/g, "ஞி");
        unicode_value = unicode_value.replace(/njI/g, "ஞீ");
        unicode_value = unicode_value.replace(/njA/g, "ஞா");
        unicode_value = unicode_value.replace(/nje/g, "ஞெ");
        unicode_value = unicode_value.replace(/njE/g, "ஞே");
        unicode_value = unicode_value.replace(/njo/g, "ஞொ");
        unicode_value = unicode_value.replace(/njO/g, "ஞோ");
        unicode_value = unicode_value.replace(/nju/g, "ஞு");
        unicode_value = unicode_value.replace(/njU/g, "ஞூ");
    
        unicode_value = unicode_value.replace(/nj/g, "ஞ்");
    
    
        unicode_value = unicode_value.replace(/ngau/g, "ஙௌ");
        unicode_value = unicode_value.replace(/ngai/g, "ஙை");
        unicode_value = unicode_value.replace(/ngee/g, "ஙே");
        unicode_value = unicode_value.replace(/ngoo/g, "ஙோ");
        unicode_value = unicode_value.replace(/ngaa/g, "ஙா");
        unicode_value = unicode_value.replace(/nguu/g, "ஙூ");
        unicode_value = unicode_value.replace(/ngii/g, "ஙீ");
        unicode_value = unicode_value.replace(/nga/g, "ங");
        unicode_value = unicode_value.replace(/ngi/g, "ஙி");
        unicode_value = unicode_value.replace(/ngI/g, "ஙீ");
        unicode_value = unicode_value.replace(/ngA/g, "ஙா");
        unicode_value = unicode_value.replace(/nge/g, "ஙெ");
        unicode_value = unicode_value.replace(/ngE/g, "ஙே");
        unicode_value = unicode_value.replace(/ngo/g, "ஙொ");
        unicode_value = unicode_value.replace(/ngO/g, "ஙோ");
        unicode_value = unicode_value.replace(/ngu/g, "ஙு");
        unicode_value = unicode_value.replace(/ngU/g, "ஙூ");
    
        unicode_value = unicode_value.replace(/ng/g, "ங்");
    
    
    
        unicode_value = unicode_value.replace(/shau/g, "ஷௌ");
        unicode_value = unicode_value.replace(/shai/g, "ஷை");
        unicode_value = unicode_value.replace(/shee/g, "ஷே");
        unicode_value = unicode_value.replace(/shoo/g, "ஷோ");
        unicode_value = unicode_value.replace(/shaa/g, "ஷா");
        unicode_value = unicode_value.replace(/shuu/g, "ஷூ");
        unicode_value = unicode_value.replace(/shii/g, "ஷீ");
        unicode_value = unicode_value.replace(/sha/g, "ஷ");
        unicode_value = unicode_value.replace(/shi/g, "ஷி");
        unicode_value = unicode_value.replace(/shI/g, "ஷீ");
        unicode_value = unicode_value.replace(/shA/g, "ஷா");
        unicode_value = unicode_value.replace(/she/g, "ஷெ");
        unicode_value = unicode_value.replace(/shE/g, "ஷே");
        unicode_value = unicode_value.replace(/sho/g, "ஷொ");
        unicode_value = unicode_value.replace(/shO/g, "ஷோ");
        unicode_value = unicode_value.replace(/shu/g, "ஷு");
        unicode_value = unicode_value.replace(/shU/g, "ஷூ");
    
        unicode_value = unicode_value.replace(/sh/g, "ஷ்");
    
        unicode_value = unicode_value.replace(/ nau/g, " நௌ");
        unicode_value = unicode_value.replace(/ nai/g, " நை");
        unicode_value = unicode_value.replace(/ nee/g, " நே");
        unicode_value = unicode_value.replace(/ noo/g, " நோ");
        unicode_value = unicode_value.replace(/ naa/g, " நா");
        unicode_value = unicode_value.replace(/ nuu/g, " நூ");
        unicode_value = unicode_value.replace(/ nii/g, " நீ");
        unicode_value = unicode_value.replace(/ na/g, " ந");
        unicode_value = unicode_value.replace(/ ni/g, " நி");
        unicode_value = unicode_value.replace(/ nI/g, " நீ");
        unicode_value = unicode_value.replace(/ nA/g, " நா");
        unicode_value = unicode_value.replace(/ ne/g, " நெ");
        unicode_value = unicode_value.replace(/ nE/g, " நே");
        unicode_value = unicode_value.replace(/ no/g, " நொ");
        unicode_value = unicode_value.replace(/ nO/g, " நோ");
        unicode_value = unicode_value.replace(/ nu/g, " நு");
        unicode_value = unicode_value.replace(/ nU/g, " நூ");
    
        unicode_value = unicode_value.replace(/ nth/g, " ந்");
    
        unicode_value = unicode_value.replace(/-nau/g, "நௌ");
        unicode_value = unicode_value.replace(/-nai/g, "நை");
        unicode_value = unicode_value.replace(/-nee/g, "நே");
        unicode_value = unicode_value.replace(/-noo/g, "நோ");
        unicode_value = unicode_value.replace(/-naa/g, "நா");
        unicode_value = unicode_value.replace(/-nuu/g, "நூ");
        unicode_value = unicode_value.replace(/-nii/g, "நீ");
        unicode_value = unicode_value.replace(/-na/g, "ந");
        unicode_value = unicode_value.replace(/-ni/g, "நி");
        unicode_value = unicode_value.replace(/-nI/g, "நீ");
        unicode_value = unicode_value.replace(/-nA/g, "நா");
        unicode_value = unicode_value.replace(/-ne/g, "நெ");
        unicode_value = unicode_value.replace(/-nE/g, "நே");
        unicode_value = unicode_value.replace(/-no/g, "நொ");
        unicode_value = unicode_value.replace(/-nO/g, "நோ");
        unicode_value = unicode_value.replace(/-nu/g, "நு");
        unicode_value = unicode_value.replace(/-nU/g, "நூ");
    
        unicode_value = unicode_value.replace(/n-au/g, "நௌ");
        unicode_value = unicode_value.replace(/n-ai/g, "நை");
        unicode_value = unicode_value.replace(/n-ee/g, "நே");
        unicode_value = unicode_value.replace(/n-oo/g, "நோ");
        unicode_value = unicode_value.replace(/n-aa/g, "நா");
        unicode_value = unicode_value.replace(/n-uu/g, "நூ");
        unicode_value = unicode_value.replace(/n-ii/g, "நீ");
        unicode_value = unicode_value.replace(/n-a/g, "ந");
        unicode_value = unicode_value.replace(/n-i/g, "நி");
        unicode_value = unicode_value.replace(/n-I/g, "நீ");
        unicode_value = unicode_value.replace(/n-A/g, "நா");
        unicode_value = unicode_value.replace(/n-e/g, "நெ");
        unicode_value = unicode_value.replace(/n-E/g, "நே");
        unicode_value = unicode_value.replace(/n-o/g, "நொ");
        unicode_value = unicode_value.replace(/n-O/g, "நோ");
        unicode_value = unicode_value.replace(/n-u/g, "நு");
        unicode_value = unicode_value.replace(/n-U/g, "நூ");
    
        unicode_value = unicode_value.replace(/wau/g, "நௌ");
        unicode_value = unicode_value.replace(/wai/g, "நை");
        unicode_value = unicode_value.replace(/wee/g, "நே");
        unicode_value = unicode_value.replace(/woo/g, "நோ");
        unicode_value = unicode_value.replace(/waa/g, "நா");
        unicode_value = unicode_value.replace(/wuu/g, "நூ");
        unicode_value = unicode_value.replace(/wii/g, "நீ");
        unicode_value = unicode_value.replace(/wa/g, "ந");
        unicode_value = unicode_value.replace(/wi/g, "நி");
        unicode_value = unicode_value.replace(/wI/g, "நீ");
        unicode_value = unicode_value.replace(/wA/g, "நா");
        unicode_value = unicode_value.replace(/we/g, "நெ");
        unicode_value = unicode_value.replace(/wE/g, "நே");
        unicode_value = unicode_value.replace(/wo/g, "நொ");
        unicode_value = unicode_value.replace(/wO/g, "நோ");
        unicode_value = unicode_value.replace(/wu/g, "நு");
        unicode_value = unicode_value.replace(/wU/g, "நூ");
    
    
    
        unicode_value = unicode_value.replace(/ n/g, " ந்");
        unicode_value = unicode_value.replace(/n-/g, "ந்");
        unicode_value = unicode_value.replace(/-n/g, "ந்");
        unicode_value = unicode_value.replace(/w/g, "ந்");
    
    
    
    
        unicode_value = unicode_value.replace(/nthau/g, "ந்தௌ");
        unicode_value = unicode_value.replace(/nthai/g, "ந்தை");
        unicode_value = unicode_value.replace(/nthee/g, "ந்தே");
        unicode_value = unicode_value.replace(/nthoo/g, "ந்தோ");
        unicode_value = unicode_value.replace(/nthaa/g, "ந்தா");
        unicode_value = unicode_value.replace(/nthuu/g, "ந்தூ");
        unicode_value = unicode_value.replace(/nthii/g, "ந்தீ");
        unicode_value = unicode_value.replace(/ntha/g, "ந்த");
        unicode_value = unicode_value.replace(/nthi/g, "ந்தி");
        unicode_value = unicode_value.replace(/nthI/g, "ந்தீ");
        unicode_value = unicode_value.replace(/nthA/g, "ந்தா");
        unicode_value = unicode_value.replace(/nthe/g, "ந்தெ");
        unicode_value = unicode_value.replace(/nthE/g, "ந்தே");
        unicode_value = unicode_value.replace(/ntho/g, "ந்தொ");
        unicode_value = unicode_value.replace(/nthO/g, "ந்தோ");
        unicode_value = unicode_value.replace(/nthu/g, "ந்து");
        unicode_value = unicode_value.replace(/nthU/g, "ந்தூ");
        unicode_value = unicode_value.replace(/nth/g, "ந்");
    
    
    
    
        unicode_value = unicode_value.replace(/dhau/g, "தௌ");
        unicode_value = unicode_value.replace(/dhai/g, "தை");
        unicode_value = unicode_value.replace(/dhee/g, "தே");
        unicode_value = unicode_value.replace(/dhoo/g, "தோ");
        unicode_value = unicode_value.replace(/dhaa/g, "தா");
        unicode_value = unicode_value.replace(/dhuu/g, "தூ");
        unicode_value = unicode_value.replace(/dhii/g, "தீ");
        unicode_value = unicode_value.replace(/dha/g, "த");
        unicode_value = unicode_value.replace(/dhi/g, "தி");
        unicode_value = unicode_value.replace(/dhI/g, "தீ");
        unicode_value = unicode_value.replace(/dhA/g, "தா");
        unicode_value = unicode_value.replace(/dhe/g, "தெ");
        unicode_value = unicode_value.replace(/dhE/g, "தே");
        unicode_value = unicode_value.replace(/dho/g, "தொ");
        unicode_value = unicode_value.replace(/dhO/g, "தோ");
        unicode_value = unicode_value.replace(/dhu/g, "து");
        unicode_value = unicode_value.replace(/dhU/g, "தூ");
    
        unicode_value = unicode_value.replace(/dh/g, "த்");
    
        unicode_value = unicode_value.replace(/chau/g, "சௌ");
        unicode_value = unicode_value.replace(/chai/g, "சை");
        unicode_value = unicode_value.replace(/chee/g, "சே");
        unicode_value = unicode_value.replace(/choo/g, "சோ");
        unicode_value = unicode_value.replace(/chaa/g, "சா");
        unicode_value = unicode_value.replace(/chuu/g, "சூ");
        unicode_value = unicode_value.replace(/chii/g, "சீ");
        unicode_value = unicode_value.replace(/cha/g, "ச");
        unicode_value = unicode_value.replace(/chi/g, "சி");
        unicode_value = unicode_value.replace(/chI/g, "சீ");
        unicode_value = unicode_value.replace(/chA/g, "சா");
        unicode_value = unicode_value.replace(/che/g, "செ");
        unicode_value = unicode_value.replace(/chE/g, "சே");
        unicode_value = unicode_value.replace(/cho/g, "சொ");
        unicode_value = unicode_value.replace(/chO/g, "சோ");
        unicode_value = unicode_value.replace(/chu/g, "சு");
        unicode_value = unicode_value.replace(/chU/g, "சூ");
    
        unicode_value = unicode_value.replace(/ch/g, "ச்");
    
        unicode_value = unicode_value.replace(/zhau/g, "ழௌ");
        unicode_value = unicode_value.replace(/zhai/g, "ழை");
        unicode_value = unicode_value.replace(/zhee/g, "ழே");
        unicode_value = unicode_value.replace(/zhoo/g, "ழோ");
        unicode_value = unicode_value.replace(/zhaa/g, "ழா");
        unicode_value = unicode_value.replace(/zhuu/g, "ழூ");
        unicode_value = unicode_value.replace(/zhii/g, "ழீ");
        unicode_value = unicode_value.replace(/zha/g, "ழ");
        unicode_value = unicode_value.replace(/zhi/g, "ழி");
        unicode_value = unicode_value.replace(/zhI/g, "ழீ");
        unicode_value = unicode_value.replace(/zhA/g, "ழா");
        unicode_value = unicode_value.replace(/zhe/g, "ழெ");
        unicode_value = unicode_value.replace(/zhE/g, "ழே");
        unicode_value = unicode_value.replace(/zho/g, "ழொ");
        unicode_value = unicode_value.replace(/zhO/g, "ழோ");
        unicode_value = unicode_value.replace(/zhu/g, "ழு");
        unicode_value = unicode_value.replace(/zhU/g, "ழூ");
    
        unicode_value = unicode_value.replace(/zh/g, "ழ்");
        unicode_value = unicode_value.replace(/zau/g, "ழௌ");
        unicode_value = unicode_value.replace(/zai/g, "ழை");
        unicode_value = unicode_value.replace(/zee/g, "ழே");
        unicode_value = unicode_value.replace(/zoo/g, "ழோ");
        unicode_value = unicode_value.replace(/zaa/g, "ழா");
        unicode_value = unicode_value.replace(/zuu/g, "ழூ");
        unicode_value = unicode_value.replace(/zii/g, "ழீ");
        unicode_value = unicode_value.replace(/za/g, "ழ");
        unicode_value = unicode_value.replace(/zi/g, "ழி");
        unicode_value = unicode_value.replace(/zI/g, "ழீ");
        unicode_value = unicode_value.replace(/zA/g, "ழா");
        unicode_value = unicode_value.replace(/ze/g, "ழெ");
        unicode_value = unicode_value.replace(/zE/g, "ழே");
        unicode_value = unicode_value.replace(/zo/g, "ழொ");
        unicode_value = unicode_value.replace(/zO/g, "ழோ");
        unicode_value = unicode_value.replace(/zu/g, "ழு");
        unicode_value = unicode_value.replace(/zU/g, "ழூ");
    
        unicode_value = unicode_value.replace(/z/g, "ழ்");
    
        unicode_value = unicode_value.replace(/jau/g, "ஜௌ");
        unicode_value = unicode_value.replace(/jai/g, "ஜை");
        unicode_value = unicode_value.replace(/jee/g, "ஜே");
        unicode_value = unicode_value.replace(/joo/g, "ஜோ");
        unicode_value = unicode_value.replace(/jaa/g, "ஜா");
        unicode_value = unicode_value.replace(/juu/g, "ஜூ");
        unicode_value = unicode_value.replace(/jii/g, "ஜீ");
        unicode_value = unicode_value.replace(/ja/g, "ஜ");
        unicode_value = unicode_value.replace(/ji/g, "ஜி");
        unicode_value = unicode_value.replace(/jI/g, "ஜீ");
        unicode_value = unicode_value.replace(/jA/g, "ஜா");
        unicode_value = unicode_value.replace(/je/g, "ஜெ");
        unicode_value = unicode_value.replace(/jE/g, "ஜே");
        unicode_value = unicode_value.replace(/jo/g, "ஜொ");
        unicode_value = unicode_value.replace(/jO/g, "ஜோ");
        unicode_value = unicode_value.replace(/ju/g, "ஜு");
        unicode_value = unicode_value.replace(/jU/g, "ஜூ");
    
        unicode_value = unicode_value.replace(/j/g, "ஜ்");
    
    
        unicode_value = unicode_value.replace(/thau/g, "தௌ");
        unicode_value = unicode_value.replace(/thai/g, "தை");
        unicode_value = unicode_value.replace(/thee/g, "தே");
        unicode_value = unicode_value.replace(/thoo/g, "தோ");
        unicode_value = unicode_value.replace(/thaa/g, "தா");
        unicode_value = unicode_value.replace(/thuu/g, "தூ");
        unicode_value = unicode_value.replace(/thii/g, "தீ");
        unicode_value = unicode_value.replace(/tha/g, "த");
        unicode_value = unicode_value.replace(/thi/g, "தி");
        unicode_value = unicode_value.replace(/thI/g, "தீ");
        unicode_value = unicode_value.replace(/thA/g, "தா");
        unicode_value = unicode_value.replace(/the/g, "தெ");
        unicode_value = unicode_value.replace(/thE/g, "தே");
        unicode_value = unicode_value.replace(/tho/g, "தொ");
        unicode_value = unicode_value.replace(/thO/g, "தோ");
        unicode_value = unicode_value.replace(/thu/g, "து");
        unicode_value = unicode_value.replace(/thU/g, "தூ");
    
        unicode_value = unicode_value.replace(/th/g, "த்");
    
        unicode_value = unicode_value.replace(/hau/g, "ஹௌ");
        unicode_value = unicode_value.replace(/hai/g, "ஹை");
        unicode_value = unicode_value.replace(/hee/g, "ஹே");
        unicode_value = unicode_value.replace(/hoo/g, "ஹோ");
        unicode_value = unicode_value.replace(/haa/g, "ஹா");
        unicode_value = unicode_value.replace(/huu/g, "ஹூ");
        unicode_value = unicode_value.replace(/hii/g, "ஹீ");
        unicode_value = unicode_value.replace(/ha/g, "ஹ");
        unicode_value = unicode_value.replace(/hi/g, "ஹி");
        unicode_value = unicode_value.replace(/hI/g, "ஹீ");
        unicode_value = unicode_value.replace(/hA/g, "ஹா");
        unicode_value = unicode_value.replace(/he/g, "ஹெ");
        unicode_value = unicode_value.replace(/hE/g, "ஹே");
        unicode_value = unicode_value.replace(/ho/g, "ஹொ");
        unicode_value = unicode_value.replace(/hO/g, "ஹோ");
        unicode_value = unicode_value.replace(/hu/g, "ஹு");
        unicode_value = unicode_value.replace(/hU/g, "ஹூ");
    
        unicode_value = unicode_value.replace(/h/g, "ஹ்");
    
    
    
        unicode_value = unicode_value.replace(/kau/g, "கௌ");
        unicode_value = unicode_value.replace(/kai/g, "கை");
        unicode_value = unicode_value.replace(/kee/g, "கே");
        unicode_value = unicode_value.replace(/koo/g, "கோ");
        unicode_value = unicode_value.replace(/kaa/g, "கா");
        unicode_value = unicode_value.replace(/kuu/g, "கூ");
        unicode_value = unicode_value.replace(/kii/g, "கீ");
        unicode_value = unicode_value.replace(/ka/g, "க");
        unicode_value = unicode_value.replace(/ki/g, "கி");
        unicode_value = unicode_value.replace(/kI/g, "கீ");
        unicode_value = unicode_value.replace(/kA/g, "கா");
        unicode_value = unicode_value.replace(/ke/g, "கெ");
        unicode_value = unicode_value.replace(/kE/g, "கே");
        unicode_value = unicode_value.replace(/ko/g, "கொ");
        unicode_value = unicode_value.replace(/kO/g, "கோ");
        unicode_value = unicode_value.replace(/ku/g, "கு");
        unicode_value = unicode_value.replace(/kU/g, "கூ");
    
        unicode_value = unicode_value.replace(/k/g, "க்");
    
    
        unicode_value = unicode_value.replace(/-sau/g, "ஸௌ");
        unicode_value = unicode_value.replace(/-sai/g, "ஸை");
        unicode_value = unicode_value.replace(/-see/g, "ஸே");
        unicode_value = unicode_value.replace(/-soo/g, "ஸோ");
        unicode_value = unicode_value.replace(/-saa/g, "ஸா");
        unicode_value = unicode_value.replace(/-suu/g, "ஸூ");
        unicode_value = unicode_value.replace(/-sii/g, "ஸீ");
        unicode_value = unicode_value.replace(/-sa/g, "ஸ");
        unicode_value = unicode_value.replace(/-si/g, "ஸி");
        unicode_value = unicode_value.replace(/-sI/g, "ஸீ");
        unicode_value = unicode_value.replace(/-sA/g, "ஸா");
        unicode_value = unicode_value.replace(/-se/g, "ஸெ");
        unicode_value = unicode_value.replace(/-sE/g, "ஸே");
        unicode_value = unicode_value.replace(/-so/g, "ஸொ");
        unicode_value = unicode_value.replace(/-sO/g, "ஸோ");
        unicode_value = unicode_value.replace(/-su/g, "ஸு");
        unicode_value = unicode_value.replace(/-sU/g, "ஸூ");
    
        unicode_value = unicode_value.replace(/-s/g, "ஸ்");
    
        unicode_value = unicode_value.replace(/Sau/g, "ஸௌ");
        unicode_value = unicode_value.replace(/Sai/g, "ஸை");
        unicode_value = unicode_value.replace(/See/g, "ஸே");
        unicode_value = unicode_value.replace(/Soo/g, "ஸோ");
        unicode_value = unicode_value.replace(/Saa/g, "ஸா");
        unicode_value = unicode_value.replace(/Suu/g, "ஸூ");
        unicode_value = unicode_value.replace(/Sii/g, "ஸீ");
        unicode_value = unicode_value.replace(/Sa/g, "ஸ");
        unicode_value = unicode_value.replace(/Si/g, "ஸி");
        unicode_value = unicode_value.replace(/SI/g, "ஸீ");
        unicode_value = unicode_value.replace(/SA/g, "ஸா");
        unicode_value = unicode_value.replace(/Se/g, "ஸெ");
        unicode_value = unicode_value.replace(/SE/g, "ஸே");
        unicode_value = unicode_value.replace(/So/g, "ஸொ");
        unicode_value = unicode_value.replace(/SO/g, "ஸோ");
        unicode_value = unicode_value.replace(/Su/g, "ஸு");
        unicode_value = unicode_value.replace(/SU/g, "ஸூ");
    
        unicode_value = unicode_value.replace(/S/g, "ஸ்");
    
    
        unicode_value = unicode_value.replace(/rau/g, "ரௌ");
        unicode_value = unicode_value.replace(/rai/g, "ரை");
        unicode_value = unicode_value.replace(/ree/g, "ரே");
        unicode_value = unicode_value.replace(/roo/g, "ரோ");
        unicode_value = unicode_value.replace(/raa/g, "ரா");
        unicode_value = unicode_value.replace(/ruu/g, "ரூ");
        unicode_value = unicode_value.replace(/rii/g, "ரீ");
        unicode_value = unicode_value.replace(/ra/g, "ர");
        unicode_value = unicode_value.replace(/ri/g, "ரி");
        unicode_value = unicode_value.replace(/rI/g, "ரீ");
        unicode_value = unicode_value.replace(/rA/g, "ரா");
        unicode_value = unicode_value.replace(/re/g, "ரெ");
        unicode_value = unicode_value.replace(/rE/g, "ரே");
        unicode_value = unicode_value.replace(/ro/g, "ரொ");
        unicode_value = unicode_value.replace(/rO/g, "ரோ");
        unicode_value = unicode_value.replace(/ru/g, "ரு");
        unicode_value = unicode_value.replace(/rU/g, "ரூ");
    
        unicode_value = unicode_value.replace(/r/g, "ர்");
    
        unicode_value = unicode_value.replace(/Rau/g, "றௌ");
        unicode_value = unicode_value.replace(/Rai/g, "றை");
        unicode_value = unicode_value.replace(/Ree/g, "றே");
        unicode_value = unicode_value.replace(/Roo/g, "றோ");
        unicode_value = unicode_value.replace(/Raa/g, "றா");
        unicode_value = unicode_value.replace(/Ruu/g, "றூ");
        unicode_value = unicode_value.replace(/Rii/g, "றீ");
        unicode_value = unicode_value.replace(/Ra/g, "ற");
        unicode_value = unicode_value.replace(/Ri/g, "றி");
        unicode_value = unicode_value.replace(/RI/g, "றீ");
        unicode_value = unicode_value.replace(/RA/g, "றா");
        unicode_value = unicode_value.replace(/Re/g, "றெ");
        unicode_value = unicode_value.replace(/RE/g, "றே");
        unicode_value = unicode_value.replace(/Ro/g, "றொ");
        unicode_value = unicode_value.replace(/RO/g, "றோ");
        unicode_value = unicode_value.replace(/Ru/g, "று");
        unicode_value = unicode_value.replace(/RU/g, "றூ");
    
        unicode_value = unicode_value.replace(/R/g, "ற்");
    
        unicode_value = unicode_value.replace(/tau/g, "டௌ");
        unicode_value = unicode_value.replace(/tai/g, "டை");
        unicode_value = unicode_value.replace(/tee/g, "டே");
        unicode_value = unicode_value.replace(/too/g, "டோ");
        unicode_value = unicode_value.replace(/taa/g, "டா");
        unicode_value = unicode_value.replace(/tuu/g, "டூ");
        unicode_value = unicode_value.replace(/tii/g, "டீ");
        unicode_value = unicode_value.replace(/ta/g, "ட");
        unicode_value = unicode_value.replace(/ti/g, "டி");
        unicode_value = unicode_value.replace(/tI/g, "டீ");
        unicode_value = unicode_value.replace(/tA/g, "டா");
        unicode_value = unicode_value.replace(/te/g, "டெ");
        unicode_value = unicode_value.replace(/tE/g, "டே");
        unicode_value = unicode_value.replace(/to/g, "டொ");
        unicode_value = unicode_value.replace(/tO/g, "டோ");
        unicode_value = unicode_value.replace(/tu/g, "டு");
        unicode_value = unicode_value.replace(/tU/g, "டூ");
    
        unicode_value = unicode_value.replace(/t/g, "ட்");
    
    
    
        unicode_value = unicode_value.replace(/sau/g, "சௌ");
        unicode_value = unicode_value.replace(/sai/g, "சை");
        unicode_value = unicode_value.replace(/see/g, "சே");
        unicode_value = unicode_value.replace(/soo/g, "சோ");
        unicode_value = unicode_value.replace(/saa/g, "சா");
        unicode_value = unicode_value.replace(/suu/g, "சூ");
        unicode_value = unicode_value.replace(/sii/g, "சீ");
        unicode_value = unicode_value.replace(/sa/g, "ச");
        unicode_value = unicode_value.replace(/si/g, "சி");
        unicode_value = unicode_value.replace(/sI/g, "சீ");
        unicode_value = unicode_value.replace(/sA/g, "சா");
        unicode_value = unicode_value.replace(/se/g, "செ");
        unicode_value = unicode_value.replace(/sE/g, "சே");
        unicode_value = unicode_value.replace(/so/g, "சொ");
        unicode_value = unicode_value.replace(/sO/g, "சோ");
        unicode_value = unicode_value.replace(/su/g, "சு");
        unicode_value = unicode_value.replace(/sU/g, "சூ");
    
        unicode_value = unicode_value.replace(/s/g, "ச்");
        unicode_value = unicode_value.replace(/pau/g, "பௌ");
        unicode_value = unicode_value.replace(/pai/g, "பை");
        unicode_value = unicode_value.replace(/pee/g, "பே");
        unicode_value = unicode_value.replace(/poo/g, "போ");
        unicode_value = unicode_value.replace(/paa/g, "பா");
        unicode_value = unicode_value.replace(/puu/g, "பூ");
        unicode_value = unicode_value.replace(/pii/g, "பீ");
        unicode_value = unicode_value.replace(/pa/g, "ப");
        unicode_value = unicode_value.replace(/pi/g, "பி");
        unicode_value = unicode_value.replace(/pI/g, "பீ");
        unicode_value = unicode_value.replace(/pA/g, "பா");
        unicode_value = unicode_value.replace(/pe/g, "பெ");
        unicode_value = unicode_value.replace(/pE/g, "பே");
        unicode_value = unicode_value.replace(/po/g, "பொ");
        unicode_value = unicode_value.replace(/pO/g, "போ");
        unicode_value = unicode_value.replace(/pu/g, "பு");
        unicode_value = unicode_value.replace(/pU/g, "பூ");
    
        unicode_value = unicode_value.replace(/p/g, "ப்");
    
        unicode_value = unicode_value.replace(/bau/g, "பௌ");
        unicode_value = unicode_value.replace(/bai/g, "பை");
        unicode_value = unicode_value.replace(/bee/g, "பே");
        unicode_value = unicode_value.replace(/boo/g, "போ");
        unicode_value = unicode_value.replace(/baa/g, "பா");
        unicode_value = unicode_value.replace(/buu/g, "பூ");
        unicode_value = unicode_value.replace(/bii/g, "பீ");
        unicode_value = unicode_value.replace(/ba/g, "ப");
        unicode_value = unicode_value.replace(/bi/g, "பி");
        unicode_value = unicode_value.replace(/bI/g, "பீ");
        unicode_value = unicode_value.replace(/bA/g, "பா");
        unicode_value = unicode_value.replace(/be/g, "பெ");
        unicode_value = unicode_value.replace(/bE/g, "பே");
        unicode_value = unicode_value.replace(/bo/g, "பொ");
        unicode_value = unicode_value.replace(/bO/g, "போ");
        unicode_value = unicode_value.replace(/bu/g, "பு");
        unicode_value = unicode_value.replace(/bU/g, "பூ");
    
        unicode_value = unicode_value.replace(/b/g, "ப்");
        unicode_value = unicode_value.replace(/mau/g, "மௌ");
        unicode_value = unicode_value.replace(/mai/g, "மை");
        unicode_value = unicode_value.replace(/mee/g, "மே");
        unicode_value = unicode_value.replace(/moo/g, "மோ");
        unicode_value = unicode_value.replace(/maa/g, "மா");
        unicode_value = unicode_value.replace(/muu/g, "மூ");
        unicode_value = unicode_value.replace(/mii/g, "மீ");
        unicode_value = unicode_value.replace(/ma/g, "ம");
        unicode_value = unicode_value.replace(/mi/g, "மி");
        unicode_value = unicode_value.replace(/mI/g, "மீ");
        unicode_value = unicode_value.replace(/mA/g, "மா");
        unicode_value = unicode_value.replace(/me/g, "மெ");
        unicode_value = unicode_value.replace(/mE/g, "மே");
        unicode_value = unicode_value.replace(/mo/g, "மொ");
        unicode_value = unicode_value.replace(/mO/g, "மோ");
        unicode_value = unicode_value.replace(/mu/g, "மு");
        unicode_value = unicode_value.replace(/mU/g, "மூ");
    
        unicode_value = unicode_value.replace(/m/g, "ம்");
    
        unicode_value = unicode_value.replace(/yau/g, "யௌ");
        unicode_value = unicode_value.replace(/yai/g, "யை");
        unicode_value = unicode_value.replace(/yee/g, "யே");
        unicode_value = unicode_value.replace(/yoo/g, "யோ");
        unicode_value = unicode_value.replace(/yaa/g, "யா");
        unicode_value = unicode_value.replace(/yuu/g, "யூ");
        unicode_value = unicode_value.replace(/yii/g, "யீ");
        unicode_value = unicode_value.replace(/ya/g, "ய");
        unicode_value = unicode_value.replace(/yi/g, "யி");
        unicode_value = unicode_value.replace(/yI/g, "யீ");
        unicode_value = unicode_value.replace(/yA/g, "யா");
        unicode_value = unicode_value.replace(/ye/g, "யெ");
        unicode_value = unicode_value.replace(/yE/g, "யே");
        unicode_value = unicode_value.replace(/yo/g, "யொ");
        unicode_value = unicode_value.replace(/yO/g, "யோ");
        unicode_value = unicode_value.replace(/yu/g, "யு");
        unicode_value = unicode_value.replace(/yU/g, "யூ");
    
        unicode_value = unicode_value.replace(/y/g, "ய்");
    
    
        unicode_value = unicode_value.replace(/dau/g, "டௌ");
        unicode_value = unicode_value.replace(/dai/g, "டை");
        unicode_value = unicode_value.replace(/dee/g, "டே");
        unicode_value = unicode_value.replace(/doo/g, "டோ");
        unicode_value = unicode_value.replace(/daa/g, "டா");
        unicode_value = unicode_value.replace(/duu/g, "டூ");
        unicode_value = unicode_value.replace(/dii/g, "டீ");
        unicode_value = unicode_value.replace(/da/g, "ட");
        unicode_value = unicode_value.replace(/di/g, "டி");
        unicode_value = unicode_value.replace(/dI/g, "டீ");
        unicode_value = unicode_value.replace(/dA/g, "டா");
        unicode_value = unicode_value.replace(/de/g, "டெ");
        unicode_value = unicode_value.replace(/dE/g, "டே");
        unicode_value = unicode_value.replace(/do/g, "டொ");
        unicode_value = unicode_value.replace(/dO/g, "டோ");
        unicode_value = unicode_value.replace(/du/g, "டு");
        unicode_value = unicode_value.replace(/dU/g, "டூ");
    
        unicode_value = unicode_value.replace(/d/g, "ட்");
    
    
        unicode_value = unicode_value.replace(/nau/g, "னௌ");
        unicode_value = unicode_value.replace(/nai/g, "னை");
        unicode_value = unicode_value.replace(/nee/g, "னே");
        unicode_value = unicode_value.replace(/noo/g, "னோ");
        unicode_value = unicode_value.replace(/naa/g, "னா");
        unicode_value = unicode_value.replace(/nuu/g, "னூ");
        unicode_value = unicode_value.replace(/nii/g, "னீ");
        unicode_value = unicode_value.replace(/na/g, "ன");
        unicode_value = unicode_value.replace(/ni/g, "னி");
        unicode_value = unicode_value.replace(/nI/g, "னீ");
        unicode_value = unicode_value.replace(/nA/g, "னா");
        unicode_value = unicode_value.replace(/ne/g, "னெ");
        unicode_value = unicode_value.replace(/nE/g, "னே");
        unicode_value = unicode_value.replace(/no/g, "னொ");
        unicode_value = unicode_value.replace(/nO/g, "னோ");
        unicode_value = unicode_value.replace(/nu/g, "னு");
        unicode_value = unicode_value.replace(/nU/g, "னூ");
    
        unicode_value = unicode_value.replace(/n/g, "ன்");
    
        unicode_value = unicode_value.replace(/Nau/g, "ணௌ");
        unicode_value = unicode_value.replace(/Nai/g, "ணை");
        unicode_value = unicode_value.replace(/Nee/g, "ணே");
        unicode_value = unicode_value.replace(/Noo/g, "ணோ");
        unicode_value = unicode_value.replace(/Naa/g, "ணா");
        unicode_value = unicode_value.replace(/Nuu/g, "ணூ");
        unicode_value = unicode_value.replace(/Nii/g, "ணீ");
        unicode_value = unicode_value.replace(/Na/g, "ண");
        unicode_value = unicode_value.replace(/Ni/g, "ணி");
        unicode_value = unicode_value.replace(/NI/g, "ணீ");
        unicode_value = unicode_value.replace(/NA/g, "ணா");
        unicode_value = unicode_value.replace(/Ne/g, "ணெ");
        unicode_value = unicode_value.replace(/NE/g, "ணே");
        unicode_value = unicode_value.replace(/No/g, "ணொ");
        unicode_value = unicode_value.replace(/NO/g, "ணோ");
        unicode_value = unicode_value.replace(/Nu/g, "ணு");
        unicode_value = unicode_value.replace(/NU/g, "ணூ");
    
        unicode_value = unicode_value.replace(/N/g, "ண்");
        unicode_value = unicode_value.replace(/lau/g, "லௌ");
        unicode_value = unicode_value.replace(/lai/g, "லை");
        unicode_value = unicode_value.replace(/lee/g, "லே");
        unicode_value = unicode_value.replace(/loo/g, "லோ");
        unicode_value = unicode_value.replace(/laa/g, "லா");
        unicode_value = unicode_value.replace(/luu/g, "லூ");
        unicode_value = unicode_value.replace(/lii/g, "லீ");
        unicode_value = unicode_value.replace(/la/g, "ல");
        unicode_value = unicode_value.replace(/li/g, "லி");
        unicode_value = unicode_value.replace(/lI/g, "லீ");
        unicode_value = unicode_value.replace(/lA/g, "லா");
        unicode_value = unicode_value.replace(/le/g, "லெ");
        unicode_value = unicode_value.replace(/lE/g, "லே");
        unicode_value = unicode_value.replace(/lo/g, "லொ");
        unicode_value = unicode_value.replace(/lO/g, "லோ");
        unicode_value = unicode_value.replace(/lu/g, "லு");
        unicode_value = unicode_value.replace(/lU/g, "லூ");
    
        unicode_value = unicode_value.replace(/l/g, "ல்");
        unicode_value = unicode_value.replace(/Lau/g, "ளௌ");
        unicode_value = unicode_value.replace(/Lai/g, "ளை");
        unicode_value = unicode_value.replace(/Lee/g, "ளே");
        unicode_value = unicode_value.replace(/Loo/g, "ளோ");
        unicode_value = unicode_value.replace(/Laa/g, "ளா");
        unicode_value = unicode_value.replace(/Luu/g, "ளூ");
        unicode_value = unicode_value.replace(/Lii/g, "ளீ");
        unicode_value = unicode_value.replace(/La/g, "ள");
        unicode_value = unicode_value.replace(/Li/g, "ளி");
        unicode_value = unicode_value.replace(/LI/g, "ளீ");
        unicode_value = unicode_value.replace(/LA/g, "ளா");
        unicode_value = unicode_value.replace(/Le/g, "ளெ");
        unicode_value = unicode_value.replace(/LE/g, "ளே");
        unicode_value = unicode_value.replace(/Lo/g, "ளொ");
        unicode_value = unicode_value.replace(/LO/g, "ளோ");
        unicode_value = unicode_value.replace(/Lu/g, "ளு");
        unicode_value = unicode_value.replace(/LU/g, "ளூ");
    
        unicode_value = unicode_value.replace(/L/g, "ள்");
    
    
    
        unicode_value = unicode_value.replace(/vau/g, "வௌ");
        unicode_value = unicode_value.replace(/vai/g, "வை");
        unicode_value = unicode_value.replace(/vee/g, "வே");
        unicode_value = unicode_value.replace(/voo/g, "வோ");
        unicode_value = unicode_value.replace(/vaa/g, "வா");
        unicode_value = unicode_value.replace(/vuu/g, "வூ");
        unicode_value = unicode_value.replace(/vii/g, "வீ");
        unicode_value = unicode_value.replace(/va/g, "வ");
        unicode_value = unicode_value.replace(/vi/g, "வி");
        unicode_value = unicode_value.replace(/vI/g, "வீ");
        unicode_value = unicode_value.replace(/vA/g, "வா");
        unicode_value = unicode_value.replace(/ve/g, "வெ");
        unicode_value = unicode_value.replace(/vE/g, "வே");
        unicode_value = unicode_value.replace(/vo/g, "வொ");
        unicode_value = unicode_value.replace(/vO/g, "வோ");
        unicode_value = unicode_value.replace(/vu/g, "வு");
        unicode_value = unicode_value.replace(/vU/g, "வூ");
    
        unicode_value = unicode_value.replace(/v/g, "வ்");
    
    
    
    
    
        unicode_value = unicode_value.replace(/gau/g, "கௌ");
        unicode_value = unicode_value.replace(/gai/g, "கை");
        unicode_value = unicode_value.replace(/gee/g, "கே");
        unicode_value = unicode_value.replace(/goo/g, "கோ");
        unicode_value = unicode_value.replace(/gaa/g, "கா");
        unicode_value = unicode_value.replace(/guu/g, "கூ");
        unicode_value = unicode_value.replace(/gii/g, "கீ");
        unicode_value = unicode_value.replace(/ga/g, "க");
        unicode_value = unicode_value.replace(/gi/g, "கி");
        unicode_value = unicode_value.replace(/gI/g, "கீ");
        unicode_value = unicode_value.replace(/gA/g, "கா");
        unicode_value = unicode_value.replace(/ge/g, "கெ");
        unicode_value = unicode_value.replace(/gE/g, "கே");
        unicode_value = unicode_value.replace(/go/g, "கொ");
        unicode_value = unicode_value.replace(/gO/g, "கோ");
        unicode_value = unicode_value.replace(/gu/g, "கு");
        unicode_value = unicode_value.replace(/gU/g, "கூ");
    
        unicode_value = unicode_value.replace(/g/g, "க்");
    
    
        unicode_value = unicode_value.replace(/au/g, "ஔ");
        unicode_value = unicode_value.replace(/ai/g, "ஐ");
        unicode_value = unicode_value.replace(/aa/g, "ஆ");
        unicode_value = unicode_value.replace(/ee/g, "ஏ");
        unicode_value = unicode_value.replace(/ii/g, "ஈ");
        unicode_value = unicode_value.replace(/uu/g, "ஊ");
        unicode_value = unicode_value.replace(/oo/g, "ஓ");
    
    
    
    
        unicode_value = unicode_value.replace(/-1000/g, "௲");
    
        unicode_value = unicode_value.replace(/-100/g, "௱");
    
        unicode_value = unicode_value.replace(/-10/g, "௰");
        unicode_value = unicode_value.replace(/-1/g, "௧");
    
        unicode_value = unicode_value.replace(/-2/g, "௨");
        unicode_value = unicode_value.replace(/-3/g, "௩");
    
        unicode_value = unicode_value.replace(/-4/g, "௪");
        unicode_value = unicode_value.replace(/-5/g, "௫");
    
        unicode_value = unicode_value.replace(/-6/g, "௬");
        unicode_value = unicode_value.replace(/-7/g, "௭");
    
        unicode_value = unicode_value.replace(/-8/g, "௮");
        unicode_value = unicode_value.replace(/-9/g, "௯");
    
    
        unicode_value = unicode_value.replace(/i/g, "இ");
        unicode_value = unicode_value.replace(/I/g, "ஈ");
    
    
        unicode_value = unicode_value.replace(/a/g, "அ");
    
        unicode_value = unicode_value.replace(/A/g, "ஆ");
    
        unicode_value = unicode_value.replace(/e/g, "எ");
        unicode_value = unicode_value.replace(/E/g, "ஏ");
        unicode_value = unicode_value.replace(/i/g, "இ");
        unicode_value = unicode_value.replace(/I/g, "ஈ");
        unicode_value = unicode_value.replace(/u/g, "உ");
        unicode_value = unicode_value.replace(/U/g, "ஊ");
        unicode_value = unicode_value.replace(/o/g, "ஒ");
        unicode_value = unicode_value.replace(/O/g, "ஓ");
    
        unicode_value = unicode_value.replace(/q/g, "ஃ");
           
    
        _.v1 = unicode_value;
    };

    _.convert_tab_2_unicode = function() {
        console.log("TAMIL TAB");
        uv = _.v0;
        
        

        _.v1 = uv;
    };
};