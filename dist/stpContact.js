"use strict";
angular.module('stpCommon.contact', ['fsmQuestion'])
    .factory('ContactService', ['QuestionService', 'QuestionTypes', 'CountryCodeService', 'QuestionUtils', function(QuestionService, QuestionTypes, CountryCodeService, QuestionUtils) {
        var QBuilder = QuestionService.getQuestionBuilder();
        var questionsCreated = false;

        function validate(){
            getQuestionGroups().forEach(function(group){
                group.questions.forEach(function(question){
                    question.validate();
                });
            });
        }

        function getQuestionGroups(){
            createQuestions();
            var groups = [];
            groups.push(createGroup([QuestionService.getQuestion('contactPhone')]));
            groups.push(createGroup([QuestionService.getQuestion('contactEmail')]));
            //QuestionService.getQuestion('contactPhone').options = CountryCodeService.getCountryCodes();
            return groups;
        }

        function createGroup(questions){
            return {questions: questions};
        }

        function createQuestions(){
            if (!questionsCreated) {
                //contactCountry();
                contactPhone();
                contactEmail();
                questionsCreated = true;
            }
        }

        function contactPhone() {
            function isSwedenAndZeroOrOtherAndBlank(question){
                var answer = question.answer;
                return (answer.countryCode.code === 'SWE' && answer.phoneNumber === '0') ||
                    (answer.countryCode.code !== 'SWE' && answer.phoneNumber === '');
            }
            var phoneValidator = {
                validate: function(question){
                    var result = {valid: true, cause: 'format', message: question.textRoot+'.ERRORS.FORMAT'};
                    if(!isSwedenAndZeroOrOtherAndBlank(question)) {
                        result.valid = QuestionUtils.isNumeric(question.answer.phoneNumber.replace(/^[\s\.\-]*$/, ''));
                    }
                    return result;
                }
            };

            return QBuilder
                .id('contactPhone')
                .type(QuestionTypes.phone)
                .text({ root:'VIEW.SECTIONS.EVENT.CONTACT_INFO.QUESTIONS.CONTACT_PHONE'})
                .max(30)
                .required(false)
                .defaultAnswer({phoneNumber: '0', countryCode: CountryCodeService.getCountryCodes()[209]})
                .values(CountryCodeService.getCountryCodes())
                .validator(phoneValidator)
                .createQuestion();
        }

        function contactEmail() {
            var emailValidator = {
                validate: function(question){
                    var emailRegex = /^([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x22([^\x0d\x22\x5c\x80-\xff]|\x5c[\x00-\x7f])*\x22)(\x2e([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x22([^\x0d\x22\x5c\x80-\xff]|\x5c[\x00-\x7f])*\x22))*\x40([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x5b([^\x0d\x5b-\x5d\x80-\xff]|\x5c[\x00-\x7f])*\x5d)(\x2e([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x5b([^\x0d\x5b-\x5d\x80-\xff]|\x5c[\x00-\x7f])*\x5d))*$/;
                    var result = {valid: true, cause: 'format', message: question.textRoot+'.ERRORS.FORMAT'};
                    result.valid = emailRegex.test(question.answer);
                    return result;
                }
            };

            return QBuilder
                .id('contactEmail')
                .type(QuestionTypes.input)
                .text({ root: 'VIEW.SECTIONS.EVENT.CONTACT_INFO.QUESTIONS.CONTACT_EMAIL' })
                .placeholder('ditt.namn@exempel.se')
                .max(254)
                .required(true)
                .validator(emailValidator)
                .createQuestion();
        }

        var service = {
            getQuestionGroups: getQuestionGroups,
            validate: validate
        };
        return service;

    }]);
"use strict";
angular.module('stpCommon.contact').factory('ContactSummaryMapper', ['$translate', 'QuestionService', function($translate, QuestionService) {

    function mapToSummaryModel(){
        var summaryModel = {header: $translate.instant('VIEW.SECTIONS.EVENT.CONTACT_INFO.TITLE'), questions: []};
        var phone = getMobileNumberSummary(QuestionService.getQuestion('contactPhone'));
        var email = getEmailSummary(QuestionService.getQuestion('contactEmail'));
        if(phone){
            summaryModel.questions.push(phone);
        }
        summaryModel.questions.push(email);
        return summaryModel;
    }

    function formatPhoneNumber(number){
        return(number.charAt(0) === '0' ? '(0) '+ number.slice(1) : number);
    }

    function getMobileNumberSummary(mobileQuestion){
        var number = mobileQuestion.answer.phoneNumber;
        if(number && number !== '0') {
            return {
                question: $translate.instant('VIEW.SECTIONS.EVENT.CONTACT_INFO.QUESTIONS.CONTACT_PHONE'),
                answer: mobileQuestion.answer.countryCode.phoneCode + ' ' + formatPhoneNumber(number)
            };
        }
    }

    function getEmailSummary(emailQuestion){
        return {
            question: $translate.instant('VIEW.SECTIONS.EVENT.CONTACT_INFO.QUESTIONS.CONTACT_EMAIL'),
            answer: emailQuestion.answer
        };
    }

    return {mapToSummaryModel: mapToSummaryModel};

}]);
'use strict';
angular.module('stpCommon.contact')
    .factory('CountryCodeService',['$filter', function($filter){

        var countryCodes=[
            {phoneCode:"0093",name:"AFGHANISTAN",id:0,code:"AFG"},{phoneCode:"00355",name:"ALBANIEN",id:1,code:"ALB"},{phoneCode:"00213",name:"ALGERIET",id:2,code:"DZA"},{phoneCode:"00684",name:"AMERIKANSKA SAMOA",id:3,code:"ASM"},{phoneCode:"001",name:"AMERIKANSKA, MINDRE UTELIGGANDE ÖAR",id:4,code:"UMI"},{phoneCode:"00376",name:"ANDORRA",id:5,code:"AND"},{phoneCode:"00244",name:"ANGOLA",id:6,code:"AGO"},{phoneCode:"001",name:"ANGUILLA",id:7,code:"AIA"},{phoneCode:"00672",name:"ANTARKTIS",id:8,code:"ATA"},{phoneCode:"001",name:"ANTIGUA OCH BARBUDA",id:9,code:"ATG"},{phoneCode:"0054",name:"ARGENTINA",id:10,code:"ARG"},{phoneCode:"00374",name:"ARMENIEN",id:11,code:"ARM"},{phoneCode:"00297",name:"ARUBA",id:12,code:"ABV"},{phoneCode:"0061",name:"AUSTRALIEN",id:13,code:"AUS"},{phoneCode:"00994",name:"AZERBAJDZJAN",id:14,code:"AZE"},{phoneCode:"001",name:"BAHAMAS",id:15,code:"BHS"},{phoneCode:"00973",name:"BAHRAIN",id:16,code:"BHR"},{phoneCode:"00880",name:"BANGLADESH",id:17,code:"BGD"},{phoneCode:"001",name:"BARBADOS",id:18,code:"BRB"},{phoneCode:"0032",name:"BELGIEN",id:19,code:"BEL"},{phoneCode:"00501",name:"BELIZE",id:20,code:"BLZ"},{phoneCode:"00229",name:"BENIN",id:21,code:"BEN"},{phoneCode:"001",name:"BERMUDA",id:22,code:"BMU"},{phoneCode:"00975",name:"BHUTAN",id:23,code:"BTN"},{phoneCode:"00591",name:"BOLIVIA",id:24,code:"BOL"},{phoneCode:"00387",name:"BOSNIEN-HERCEGOVINA",id:25,code:"BIH"},{phoneCode:"00267",name:"BOTSWANA",id:26,code:"BWA"},{phoneCode:"0047",name:"BOUVETÖN",id:27,code:"BVT"},{phoneCode:"0055",name:"BRASILIEN",id:28,code:"BRA"},{phoneCode:"00246",name:"BRITTISKA INDISKA OCEANÖARNA",id:29,code:"IOT"},{phoneCode:"001",name:"BRITTISKA JUNGFRUÖARNA",id:30,code:"VGB"},{phoneCode:"00673",name:"BRUNEI DARUSSALAM",id:31,code:"BRN"},{phoneCode:"00359",name:"BULGARIEN",id:32,code:"BGR"},{phoneCode:"00226",name:"BURKINA FASO",id:33,code:"BFA"},{phoneCode:"00257",name:"BURUNDI",id:34,code:"BDI"},{phoneCode:"001",name:"CAYMANÖARNA",id:35,code:"CYM"},{phoneCode:"00236",name:"CENTRALAFRIKANSKA REPUBLIKEN",id:36,code:"CAF"},{phoneCode:"0056",name:"CHILE",id:37,code:"CHL"},{phoneCode:"0057",name:"COLOMBIA",id:38,code:"COL"},{phoneCode:"00269",name:"COMORERNA",id:39,code:"COM"},{phoneCode:"00682",name:"COOKÖARNA",id:40,code:"COK"},{phoneCode:"00506",name:"COSTA RICA",id:41,code:"CRI"},{phoneCode:"00357",name:"CYPERN",id:42,code:"CYP"},{phoneCode:"0045",name:"DANMARK",id:43,code:"DNK"},{phoneCode:"00253",name:"DJIBOUTI",id:44,code:"DJI"},{phoneCode:"001",name:"DOMINICA",id:45,code:"DMA"},{phoneCode:"001",name:"DOMINIKANSKA REPUBLIKEN",id:46,code:"DOM"},{phoneCode:"00593",name:"ECUADOR",id:47,code:"ECU"},{phoneCode:"0020",name:"EGYPTEN",id:48,code:"EGY"},{phoneCode:"00240",name:"EKVATORIALGUINEA",id:49,code:"GNQ"},{phoneCode:"00503",name:"EL SALVADOR",id:50,code:"SLV"},{phoneCode:"00225",name:"ELFENBENSKUSTEN",id:51,code:"CIV"},{phoneCode:"00291",name:"ERITREA",id:52,code:"ERI"},{phoneCode:"00372",name:"ESTLAND",id:53,code:"EST"},{phoneCode:"00251",name:"ETIOPIEN",id:54,code:"ETH"},{phoneCode:"00500",name:"FALKLANDSÖARNA",id:55,code:"FLK"},{phoneCode:"00679",name:"FIJIÖARNA",id:56,code:"FJI"},{phoneCode:"0063",name:"FILIPPINERNA",id:57,code:"PHL"},{phoneCode:"00358",name:"FINLAND",id:58,code:"FIN"},{phoneCode:"0033",name:"FRANKRIKE",id:59,code:"FRA"},{phoneCode:"0033",name:"FRANKRIKE, METROPOLITAN",id:60,code:"FXX"},{phoneCode:"00594",name:"FRANSKA GUYANA",id:61,code:"GUF"},{phoneCode:"00689",name:"FRANSKA POLYNESIEN",id:62,code:"PYF"},{phoneCode:"0033",name:"FRANSKA SYDTERRITORIERNA",id:63,code:"ATF"},{phoneCode:"00298",name:"FÄRÖARNA",id:64,code:"FRO"},{phoneCode:"00971",name:"FÖRENADE ARABEMIRATEN",id:65,code:"ARE"},{phoneCode:"00241",name:"GABON",id:66,code:"GAB"},{phoneCode:"00220",name:"GAMBIA",id:67,code:"GMB"},{phoneCode:"00995",name:"GEORGIEN",id:68,code:"GEO"},{phoneCode:"00233",name:"GHANA",id:69,code:"GHA"},{phoneCode:"00350",name:"GIBRALTAR",id:70,code:"GIB"},{phoneCode:"0030",name:"GREKLAND",id:71,code:"GRC"},{phoneCode:"001",name:"GRENADA",id:72,code:"GRD"},{phoneCode:"00299",name:"GRÖNLAND",id:73,code:"GRL"},{phoneCode:"00590",name:"GUADELOUPE",id:74,code:"GLP"},{phoneCode:"001",name:"GUAM",id:75,code:"GUM"},{phoneCode:"00502",name:"GUATEMALA",id:76,code:"GTM"},{phoneCode:"0044",name:"GUERNSEY",id:77,code:"GGY"},{phoneCode:"00224",name:"GUINEA",id:78,code:"GIN"},{phoneCode:"00245",name:"GUINEA-BISSAU",id:79,code:"GNB"},{phoneCode:"00592",name:"GUYANA",id:80,code:"GUY"},{phoneCode:"00509",name:"HAITI",id:81,code:"HTI"},{phoneCode:"0061",name:"HEARDÖN OCH MCDONALDÖARNA",id:82,code:"HMD"},{phoneCode:"00504",name:"HONDURAS",id:83,code:"HND"},{phoneCode:"00852",name:"HONGKONG",id:84,code:"HKG"},{phoneCode:"0091",name:"INDIEN",id:85,code:"IND"},{phoneCode:"0062",name:"INDONESIEN",id:86,code:"IDN"},{phoneCode:"00964",name:"IRAK",id:87,code:"IRQ"},{phoneCode:"0098",name:"IRAN",id:88,code:"IRN"},{phoneCode:"00353",name:"IRLAND",id:89,code:"IRL"},{phoneCode:"00354",name:"ISLAND",id:90,code:"ISL"},{phoneCode:"0044",name:"ISLE OF MAN",id:91,code:"IMN"},{phoneCode:"00972",name:"ISRAEL",id:92,code:"ISR"},{phoneCode:"0039",name:"ITALIEN",id:93,code:"ITA"},{phoneCode:"001",name:"JAMAICA",id:94,code:"JAM"},{phoneCode:"0081",name:"JAPAN",id:95,code:"JPN"},{phoneCode:"00967",name:"JEMEN",id:96,code:"YEM"},{phoneCode:"0044",name:"JERSEY",id:97,code:"JEY"},{phoneCode:"00962",name:"JORDANIEN",id:98,code:"JOR"},{phoneCode:"0061",name:"JULÖN",id:99,code:"CXR"},{phoneCode:"001",name:"JUNGFRUÖARNA USA",id:100,code:"VIR"},{phoneCode:"00855",name:"KAMBODJA",id:101,code:"KHM"},{phoneCode:"00237",name:"KAMERUN",id:102,code:"CMR"},{phoneCode:"001",name:"KANADA",id:103,code:"CAN"},{phoneCode:"00238",name:"KAP VERDE",id:104,code:"CPV"},{phoneCode:"007",name:"KAZAKSTAN",id:105,code:"KAZ"},{phoneCode:"00254",name:"KENYA",id:106,code:"KEN"},{phoneCode:"0086",name:"KINA",id:107,code:"CHN"},{phoneCode:"00996",name:"KIRGISTAN",id:108,code:"KGZ"},{phoneCode:"00686",name:"KIRIBATI",id:109,code:"KIR"},{phoneCode:"0061",name:"KOKOSÖARNA",id:110,code:"CCK"},{phoneCode:"00242",name:"KONGO",id:111,code:"COG"},{phoneCode:"00243",name:"KONGO, DEMOKRATISKA REPUBLIKEN",id:112,code:"COD"},{phoneCode:"00381",name:"KOSOVO",id:113,code:"XKM"},{phoneCode:"00385",name:"KROATIEN",id:114,code:"HRV"},{phoneCode:"0053",name:"KUBA",id:115,code:"CUB"},{phoneCode:"00965",name:"KUWAIT",id:116,code:"KWT"},{phoneCode:"00856",name:"LAOS",id:117,code:"LAO"},{phoneCode:"00266",name:"LESOTHO",id:118,code:"LSO"},{phoneCode:"00371",name:"LETTLAND",id:119,code:"LVA"},{phoneCode:"00961",name:"LIBANON",id:120,code:"LBN"},{phoneCode:"00231",name:"LIBERIA",id:121,code:"LBR"},{phoneCode:"00218",name:"LIBYEN",id:122,code:"LBY"},{phoneCode:"00423",name:"LIECHTENSTEIN",id:123,code:"LIE"},{phoneCode:"00370",name:"LITAUEN",id:124,code:"LTU"},{phoneCode:"00352",name:"LUXEMBURG",id:125,code:"LUX"},{phoneCode:"00853",name:"MACAO",id:126,code:"MAC"},{phoneCode:"00261",name:"MADAGASKAR",id:127,code:"MDG"},{phoneCode:"00389",name:"MAKEDONIEN",id:128,code:"MKD"},{phoneCode:"00265",name:"MALAWI",id:129,code:"MWI"},{phoneCode:"0060",name:"MALAYSIA",id:130,code:"MYS"},{phoneCode:"00960",name:"MALDIVERNA",id:131,code:"MDV"},{phoneCode:"00223",name:"MALI",id:132,code:"MLI"},{phoneCode:"00356",name:"MALTA",id:133,code:"MLT"},{phoneCode:"00212",name:"MAROCKO",id:134,code:"MAR"},{phoneCode:"00692",name:"MARSHALLÖARNA",id:135,code:"MHL"},{phoneCode:"00596",name:"MARTINIQUE",id:136,code:"MTQ"},{phoneCode:"00222",name:"MAURETANIEN",id:137,code:"MRT"},{phoneCode:"00230",name:"MAURITIUS",id:138,code:"MUS"},{phoneCode:"00269",name:"MAYOTTE",id:139,code:"MYT"},{phoneCode:"0052",name:"MEXIKO",id:140,code:"MEX"},{phoneCode:"00691",name:"MIKRONESISKA FEDERATIONEN",id:141,code:"FSM"},{phoneCode:"00373",name:"MOLDAVIEN",id:142,code:"MDA"},{phoneCode:"00377",name:"MONACO",id:143,code:"MCO"},{phoneCode:"00976",name:"MONGOLIET",id:144,code:"MNG"},{phoneCode:"00382",name:"MONTENEGRO",id:145,code:"MNE"},{phoneCode:"001",name:"MONTSERRAT",id:146,code:"MSR"},{phoneCode:"00258",name:"MOZAMBIQUE",id:147,code:"MOZ"},{phoneCode:"0095",name:"MYANMAR",id:148,code:"MMR"},{phoneCode:"00264",name:"NAMIBIA",id:149,code:"NAM"},{phoneCode:"00674",name:"NAURU",id:150,code:"NRU"},{phoneCode:"0031",name:"NEDERLÄNDERNA",id:151,code:"NLD"},{phoneCode:"00599",name:"NEDERLÄNDSKA ANTILLERNA",id:152,code:"ANT"},{phoneCode:"00977",name:"NEPAL",id:153,code:"NPL"},{phoneCode:"00505",name:"NICARAGUA",id:154,code:"NIC"},{phoneCode:"00227",name:"NIGER",id:155,code:"NER"},{phoneCode:"00234",name:"NIGERIA",id:156,code:"NGA"},{phoneCode:"00683",name:"NIUE",id:157,code:"NIU"},{phoneCode:"00850",name:"NORDKOREA",id:158,code:"PRK"},{phoneCode:"00672",name:"NORFOLKÖN",id:159,code:"NFK"},{phoneCode:"0047",name:"NORGE",id:160,code:"NOR"},{phoneCode:"001",name:"NORRA MARIANA-ÖARNA",id:161,code:"MNP"},{phoneCode:"00687",name:"NYA KALEDONIEN",id:162,code:"NCL"},{phoneCode:"0064",name:"NYA ZEELAND",id:163,code:"NZL"},{phoneCode:"0970",name:"OCKUPERAT PALESTINSKT OMRÅDE",id:164,code:"PSE"},{phoneCode:"00968",name:"OMAN",id:165,code:"OMN"},{phoneCode:"0092",name:"PAKISTAN",id:166,code:"PAK"},{phoneCode:"00680",name:"PALAU",id:167,code:"PLW"},{phoneCode:"00507",name:"PANAMA",id:168,code:"PAN"},{phoneCode:"00675",name:"PAPUA NYA GUINEA",id:169,code:"PNG"},{phoneCode:"00595",name:"PARAGUAY",id:170,code:"PRY"},{phoneCode:"0051",name:"PERU",id:171,code:"PER"},{phoneCode:"001",name:"PITCAIRN",id:172,code:"PCN"},{phoneCode:"0048",name:"POLEN",id:173,code:"POL"},{phoneCode:"00351",name:"PORTUGAL",id:174,code:"PRT"},{phoneCode:"001",name:"PUERTO RICO",id:175,code:"PRI"},{phoneCode:"00974",name:"QATAR",id:176,code:"QAT"},{phoneCode:"00262",name:"REUNION",id:177,code:"REU"},{phoneCode:"0040",name:"RUMÄNIEN",id:178,code:"ROU"},{phoneCode:"00250",name:"RWANDA",id:179,code:"RWA"},{phoneCode:"007",name:"RYSSLAND",id:180,code:"RUS"},{phoneCode:"00212",name:"SAHARA, VÄSTRA",id:181,code:"ESH"},{phoneCode:"00590",name:"SAINT BARTHÉLEMY",id:182,code:"BLM"},{phoneCode:"00290",name:"SAINT HELENA",id:183,code:"SHN"},{phoneCode:"001",name:"SAINT KITTS OCH NEVIS",id:184,code:"KNA"},{phoneCode:"001",name:"SAINT LUCIA",id:185,code:"LCA"},{phoneCode:"00590",name:"SAINT MARTIN",id:186,code:"MAF"},{phoneCode:"00508",name:"SAINT PIERRE OCH MIQUELON",id:187,code:"SPM"},{phoneCode:"001",name:"SAINT VINCENT OCH GRENADINERNA",id:188,code:"VCT"},{phoneCode:"00677",name:"SALOMONÖARNA",id:189,code:"SLB"},{phoneCode:"00685",name:"SAMOA",id:190,code:"WSM"},{phoneCode:"00378",name:"SAN MARINO",id:191,code:"SMR"},{phoneCode:"00239",name:"SAO TOME OCH PRINCIPE",id:192,code:"STP"},{phoneCode:"00966",name:"SAUDIARABIEN",id:193,code:"SAU"},{phoneCode:"0041",name:"SCHWEIZ",id:194,code:"CHE"},{phoneCode:"00221",name:"SENEGAL",id:195,code:"SEN"},{phoneCode:"00381",name:"SERBIEN",id:196,code:"SRB"},{phoneCode:"00248",name:"SEYCHELLERNA",id:197,code:"SYC"},{phoneCode:"00232",name:"SIERRA LEONE",id:198,code:"SLE"},{phoneCode:"0065",name:"SINGAPORE",id:199,code:"SGP"},{phoneCode:"00421",name:"SLOVAKIEN",id:200,code:"SVK"},{phoneCode:"00386",name:"SLOVENIEN",id:201,code:"SVN"},{phoneCode:"00252",name:"SOMALIA",id:202,code:"SOM"},{phoneCode:"0034",name:"SPANIEN",id:203,code:"ESP"},{phoneCode:"0094",name:"SRI LANKA",id:204,code:"LKA"},{phoneCode:"0044",name:"STORBRITANNIEN",id:205,code:"GBR"},{phoneCode:"00249",name:"SUDAN",id:206,code:"SDN"},{phoneCode:"00597",name:"SURINAM",id:207,code:"SUR"},{phoneCode:"0047",name:"SVALBARD OCH JAN MAYEN",id:208,code:"SJM"},{phoneCode:"0046",name:"SVERIGE",id:209,code:"SWE"},{phoneCode:"00268",name:"SWAZILAND",id:210,code:"SWZ"},{phoneCode:"0027",name:"SYDAFRIKA",id:211,code:"ZAF"},{phoneCode:"0044",name:"SYDGEORGIEN OCH SÖDRA SANDWICHÖARNA",id:212,code:"SGS"},{phoneCode:"0082",name:"SYDKOREA",id:213,code:"KOR"},{phoneCode:"00963",name:"SYRIEN",id:214,code:"SYR"},{phoneCode:"00992",name:"TADZJIKISTAN",id:215,code:"TJK"},{phoneCode:"00886",name:"TAIWAN",id:216,code:"TWN"},{phoneCode:"00255",name:"TANZANIA",id:217,code:"TZA"},{phoneCode:"00235",name:"TCHAD",id:218,code:"TCD"},{phoneCode:"0066",name:"THAILAND",id:219,code:"THA"},{phoneCode:"00420",name:"TJECKIEN",id:220,code:"CZE"},{phoneCode:"00228",name:"TOGO",id:221,code:"TGO"},{phoneCode:"00690",name:"TOKELAU",id:222,code:"TKL"},{phoneCode:"00676",name:"TONGA",id:223,code:"TON"},{phoneCode:"001",name:"TRINIDAD OCH TOBAGO",id:224,code:"TTO"},{phoneCode:"00216",name:"TUNISIEN",id:225,code:"TUN"},{phoneCode:"0090",name:"TURKIET",id:226,code:"TUR"},{phoneCode:"00993",name:"TURKMENISTAN",id:227,code:"TKM"},{phoneCode:"001",name:"TURKS- OCH CAICOSÖARNA",id:228,code:"TCA"},{phoneCode:"00688",name:"TUVALU",id:229,code:"TUV"},{phoneCode:"0049",name:"TYSKLAND",id:230,code:"DEU"},{phoneCode:"00256",name:"UGANDA",id:231,code:"UGA"},{phoneCode:"00380",name:"UKRAINA",id:232,code:"UKR"},{phoneCode:"0036",name:"UNGERN",id:233,code:"HUN"},{phoneCode:"00598",name:"URUGUAY",id:234,code:"URY"},{phoneCode:"001",name:"USA",id:235,code:"USA"},{phoneCode:"00998",name:"UZBEKISTAN",id:236,code:"UZB"},{phoneCode:"00678",name:"VANUATU",id:237,code:"VUT"},{phoneCode:"0039",name:"VATIKANSTATEN",id:238,code:"VAT"},{phoneCode:"0058",name:"VENEZUELA",id:239,code:"VEN"},{phoneCode:"0084",name:"VIETNAM",id:240,code:"VNM"},{phoneCode:"00375",name:"VITRYSSLAND",id:241,code:"BLR"},{phoneCode:"00681",name:"WALLIS OCH FUTUNA",id:242,code:"WLF"},{phoneCode:"00243",name:"ZAIRE",id:243,code:"ZAR"},{phoneCode:"00260",name:"ZAMBIA",id:244,code:"ZMB"},{phoneCode:"00263",name:"ZIMBABWE",id:245,code:"ZWE"},{phoneCode:"00358",name:"ÅLAND",id:246,code:"ALA"},{phoneCode:"0043",name:"ÖSTERRIKE",id:247,code:"AUT"},{phoneCode:"00670",name:"ÖSTTIMOR",id:248,code:"TLS"}
        ];

        return {
            getCountryCodes :function(){
                countryCodes.forEach(function(country){
                    country.value =   $filter('translate')('COUNTRIES.'+country.code);
                });
                return countryCodes;
            }
        };
    }]).filter('phonecodeFilter', phonecodeFilter);

function phonecodeFilter(){

    return function(phonecodes, search){
        var matches = [];

        if(search){
            phonecodes.forEach(function(phonecode){
                if(phonecode.name.toUpperCase().indexOf(search.toUpperCase()) === 0){
                    matches.push(phonecode);
                }
            });
            return matches;
        } else {
            return phonecodes;
        }
    };
}
angular.module('stpContactTemplates', ['contact/contact.html']);

angular.module("contact/contact.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("contact/contact.html",
    "<div ng-controller=\"ContactInformationCtrl\">\n" +
    "    <h3 class=\"form-section__subheading\" translate>{{title}}</h3>\n" +
    "    <div class=\"grid-wrapper\">\n" +
    "        <div class=\"\">\n" +
    "            <fsm-question-group group=\"group\" ng-repeat=\"group in groups track by $index\" />\n" +
    "        </div>\n" +
    "    </div>\n" +
    "</div>");
}]);
