import { placeToChangeset } from 'last-strawberry/utils/google-place-utils';
import { module, test } from 'qunit';

module('Unit | Utils | google place utils');

// test('returns expected change set', function(assert) {
//   const googlePlaceRespone = getGooglePlaceRespone();
//   debugger;
//   const result = placeToChangeset(googlePlaceRespone);
//   assert.equal(result, {});
// });
//
// function getGooglePlaceRespone(){
//   return {
//      "address_components" : [
//         {
//            "long_name" : "5",
//            "short_name" : "5",
//            "types" : [ "floor" ]
//         },
//         {
//            "long_name" : "48",
//            "short_name" : "48",
//            "types" : [ "street_number" ]
//         },
//         {
//            "long_name" : "Pirrama Rd",
//            "short_name" : "Pirrama Rd",
//            "types" : [ "route" ]
//         },
//         {
//            "long_name" : "Pyrmont",
//            "short_name" : "Pyrmont",
//            "types" : [ "locality", "political" ]
//         },
//         {
//            "long_name" : "New South Wales",
//            "short_name" : "NSW",
//            "types" : [ "administrative_area_level_1", "political" ]
//         },
//         {
//            "long_name" : "Australia",
//            "short_name" : "AU",
//            "types" : [ "country", "political" ]
//         },
//         {
//            "long_name" : "2009",
//            "short_name" : "2009",
//            "types" : [ "postal_code" ]
//         }
//      ],
//      "adr_address" : "5, \u003cspan class=\"street-address\"\u003e48 Pirrama Rd\u003c/span\u003e, \u003cspan class=\"locality\"\u003ePyrmont\u003c/span\u003e \u003cspan class=\"region\"\u003eNSW\u003c/span\u003e \u003cspan class=\"postal-code\"\u003e2009\u003c/span\u003e, \u003cspan class=\"country-name\"\u003eAustralia\u003c/span\u003e",
//      "formatted_address" : "5, 48 Pirrama Rd, Pyrmont NSW 2009, Australia",
//      "formatted_phone_number" : "(02) 9374 4000",
//      "geometry" : {
//         "location" : {
//            "lat" : -33.866651,
//            "lng" : 151.195827
//         },
//         "viewport" : {
//            "northeast" : {
//               "lat" : -33.86656485,
//               "lng" : 151.196029
//            },
//            "southwest" : {
//               "lat" : -33.86690944999999,
//               "lng" : 151.195221
//            }
//         }
//      },
//      "icon" : "https://maps.gstatic.com/mapfiles/place_api/icons/generic_business-71.png",
//      "id" : "4f89212bf76dde31f092cfc14d7506555d85b5c7",
//      "international_phone_number" : "+61 2 9374 4000",
//      "name" : "Google",
//      "opening_hours" : {
//         "open_now" : false,
//         "periods" : [
//            {
//               "close" : {
//                  "day" : 1,
//                  "time" : "1800"
//               },
//               "open" : {
//                  "day" : 1,
//                  "time" : "0800"
//               }
//            },
//            {
//               "close" : {
//                  "day" : 2,
//                  "time" : "1800"
//               },
//               "open" : {
//                  "day" : 2,
//                  "time" : "0800"
//               }
//            },
//            {
//               "close" : {
//                  "day" : 3,
//                  "time" : "1800"
//               },
//               "open" : {
//                  "day" : 3,
//                  "time" : "0800"
//               }
//            },
//            {
//               "close" : {
//                  "day" : 4,
//                  "time" : "1800"
//               },
//               "open" : {
//                  "day" : 4,
//                  "time" : "0800"
//               }
//            },
//            {
//               "close" : {
//                  "day" : 5,
//                  "time" : "1800"
//               },
//               "open" : {
//                  "day" : 5,
//                  "time" : "0800"
//               }
//            }
//         ],
//         "weekday_text" : [
//            "Monday: 8:00 AM – 6:00 PM",
//            "Tuesday: 8:00 AM – 6:00 PM",
//            "Wednesday: 8:00 AM – 6:00 PM",
//            "Thursday: 8:00 AM – 6:00 PM",
//            "Friday: 8:00 AM – 6:00 PM",
//            "Saturday: Closed",
//            "Sunday: Closed"
//         ]
//      },
//      "photos" : [
//         {
//            "height" : 1365,
//            "html_attributions" : [
//               "\u003ca href=\"https://maps.google.com/maps/contrib/105932078588305868215/photos\"\u003eMaksym Kozlenko\u003c/a\u003e"
//            ],
//            "photo_reference" : "CoQBcwAAAJN75dDGz0wlYonpSeZUOT4E_Dk769ZmXERr-oewO5t8GpT7c_gN6ZvHpWPWNTQuiFoj7pMalMDY6la-eqnlkpS9NemyV1GS7FKEPAVKtDTPA6-E41VIeDpjXu1vdZS_t5eJp8gNxYTOLiZW8w52YnK-ta9kHrvpCSqnAveNf-kDEhAwBj79hEUMImdAIFPxY6SoGhTFy-TH-KChZA44zMOEyU5HanWPxg",
//            "width" : 2048
//         },
//         {
//            "height" : 960,
//            "html_attributions" : [
//               "\u003ca href=\"https://maps.google.com/maps/contrib/100919424873665842845/photos\"\u003eDonnie Piercey\u003c/a\u003e"
//            ],
//            "photo_reference" : "CoQBcwAAAHBTvJqYrMSukbIWhnlnzQffIRApVDsRqd3G1nIDpzTsbfSuq2Lc4HtwVk1jBHPCiAK8rNfxdmWS-3Wf2XEu_QM1_HzkghP59imExZo5QrCKRFy9HSEUjZCvP02MN9MceNzCSgctz0rYiK_eSmB5c4vBVrs6q9V2yFrtBerSZOzQEhDzmnEyDhMGzwvYvQ2FaessGhRavEgOF6H10FiGVCkzZkAJsWgQ2g",
//            "width" : 1280
//         },
//         {
//            "height" : 1184,
//            "html_attributions" : [
//               "\u003ca href=\"https://maps.google.com/maps/contrib/106645265231048995466/photos\"\u003eMalik Ahamed\u003c/a\u003e"
//            ],
//            "photo_reference" : "CoQBdwAAALnAdvoi9IHVlsx8OjatSv1MWTLCPWCS3I_q7WjN_lxK5l3_boIrgLnR21Xz78sqPdUHbyVS-Zp2N7pvYVu7zyMUyC0sVEyfatWeSxpoonAfzp6lBXfg1TR_rtirUIT5wzTWoNq0aer8T3xgRo3SUozKKby38YGeD-0qkmEy_dF8EhA1e_QEz2s-KgABLeDMrAhLGhSwB2E0nuT4Oa3sTBG3nXByjSn6RA",
//            "width" : 1776
//         },
//         {
//            "height" : 3120,
//            "html_attributions" : [
//               "\u003ca href=\"https://maps.google.com/maps/contrib/116783625253584801301/photos\"\u003eSamson Jabin\u003c/a\u003e"
//            ],
//            "photo_reference" : "CoQBdwAAANEjsT93-OjBnk4chd3BIgE_uETB78WgB_0_uDh-Mes2uylsgE7PW6WwwclKt3FMocXOWjMTDrq_4_D2oqWbo-IJvu-K2r-N8aO9M7XkFaYUIP3QHuffUDpJUO1PLuP5J00G_PhssQKwoheDIA6YrUoI_7MnNYaSgVzdbjh0qvDmEhDnvT9HOkY7EszMxcMTYTkMGhSB_SeScgsHXqw4qs-slBvRDJd0Pw",
//            "width" : 4160
//         },
//         {
//            "height" : 3024,
//            "html_attributions" : [
//               "\u003ca href=\"https://maps.google.com/maps/contrib/117393076859685917096/photos\"\u003eJoann Chu\u003c/a\u003e"
//            ],
//            "photo_reference" : "CoQBdwAAABRCOBDi32y_UPnu2NcJBtqWd9zvGjv86KbnTRrKkEdXypr4kbEP7RkxNl-FElXIeRA53ugmqCpTLqGq7VyluNEuxFiRt5BPYdrN8KgSv2DDt1NBmxt6zubYs4rEMBc9krteEjF47wn2JM44sMrRc0xB5BLv8Eqx7OXfH-iRDpnnEhCtXq85d71lNJ-ZESXgubXbGhSLTZ4yZK3ggf9WH9E0vjXp-jIk5g",
//            "width" : 4032
//         },
//         {
//            "height" : 5582,
//            "html_attributions" : [
//               "\u003ca href=\"https://maps.google.com/maps/contrib/110754641211532656340/photos\"\u003eRobert Koch\u003c/a\u003e"
//            ],
//            "photo_reference" : "CoQBdwAAAF2uSox-SFKCSRDqGNEJTUdRrDDWWibOUgVkrVeZgWpVOIhW-cHPO76fhpcWFUF6brQkrO3QDVH0c2TCuu8KvBTB8zhEXcT7YVKqRZUG6pAD5h0naauudORZldv-tapkm_j74vrMzN-_QQnsxOofBOOjhHCknRqn7di9a4-jg8saEhAYK6mVnyyZ9t_dfzjSMRkIGhRZ6A7ypBJggOMcx4NrimF9GRsaQg",
//            "width" : 2866
//         },
//         {
//            "height" : 4032,
//            "html_attributions" : [
//               "\u003ca href=\"https://maps.google.com/maps/contrib/114399903150862849931/photos\"\u003eMakiko Nakamoto\u003c/a\u003e"
//            ],
//            "photo_reference" : "CoQBdwAAAJs4Sf6zMhymlwf_zT9C-9uOQqqwy9EwntepiXXn_4QQAUgHc-SbHYOgtCxY5_R9rcuQRTcJ5myI_W1sBglDBpwyD2pC64C8h3uordVRiIa0o51uVDTu4lbza_AXoOAiDq0CQPHEe4eOkWbrFA-W2eZGp7Wrx4AOUXaOnYRgKyu6EhBJ9VsPDRUx1niC7roRMxqyGhR5lNZhsvAWfKm8amf5uvHuYQkF-Q",
//            "width" : 3024
//         },
//         {
//            "height" : 2988,
//            "html_attributions" : [
//               "\u003ca href=\"https://maps.google.com/maps/contrib/103594026264127040754/photos\"\u003eDaniel Tyson\u003c/a\u003e"
//            ],
//            "photo_reference" : "CoQBdwAAALmIGslM-oJzVESxiVCqqNL0Z0YrnA3eVi_--vQXkrAzPk-MACNmmsOh4IsyTat1HLsf_3Z7zLYoMdCIeNGFcpHRfnTyaHsCoCpmEtFonsrRVX-o8bFXdkIpk16-XzjR4ZpFvzU_8uxDe55AxCPan7X6s_wEtDnzjhur5H8-zac_EhCkYGZYk_aecw3Ous5kr3izGhSh-HCeXS8A0D6c1-l-szpZGs0YuQ",
//            "width" : 5312
//         },
//         {
//            "height" : 2448,
//            "html_attributions" : [
//               "\u003ca href=\"https://maps.google.com/maps/contrib/116976377324210679577/photos\"\u003eWH CHEN\u003c/a\u003e"
//            ],
//            "photo_reference" : "CoQBdwAAACOttNFWF7WTx-BuWWFiKPp_dl5KwW5XOHJpskWhkZDgIXLbPxlqZHJRC-Vg2nCwyoHVX-yvic2rTtMqBa9wPpAgGttOzNFcVHItYDsjNh65y0_HuIOF_Yxbb_18AAQfliDa6uBsMHnweqcQPm1ajPejwKOCSXg5Dxu8Of3zOUlZEhDMj0hOPPUC8iVRfP5RfmBrGhRNcggLD-840ppKkCCMNSk6h5wTQQ",
//            "width" : 3264
//         },
//         {
//            "height" : 1184,
//            "html_attributions" : [
//               "\u003ca href=\"https://maps.google.com/maps/contrib/106645265231048995466/photos\"\u003eMalik Ahamed\u003c/a\u003e"
//            ],
//            "photo_reference" : "CoQBdwAAAAU7NxSxVQN-Bzl6_vAJCx7--MOEays_YZuEQVZVyav0lToVlTM7rLdpldDlC6wd486JthJ1Mn7L-Dt4ge987W3EVgrSVQDZt-4TjBUqZsryEBs-zItktQ5lBz6KCLBD8j8UPHlAtB86Dp3haaHQ8k8i7k6kR5wvKbcVGU5KvsfAEhCbU086Id3CQCBiEgfhUEetGhRz34GJBkK0Xmaf7f7MpDRbCngf8g",
//            "width" : 1776
//         }
//      ],
//      "place_id" : "ChIJN1t_tDeuEmsRUsoyG83frY4",
//      "rating" : 4.6,
//      "reference" : "CmRaAAAAIw01cRvY1T0yY9owaaHOVGJbJ1TCA1ut3D28r8nqIgslvTIH0P4BUmnBYa3U9MK9AE7Cb9_Sw98nTXP0Ou_-V2Jvu0NAe1NVG6A5FAAJP7RmOK5ZyNlJMban-2Q6dwInEhByt77oFuNuzmDGT-NFws6tGhT2vg9xpJlbGEtzQrhbWW2Dl8NbJg",
//      "reviews" : [
//         {
//            "aspects" : [
//               {
//                  "rating" : 0,
//                  "type" : "overall"
//               }
//            ],
//            "author_name" : "TheHealthRetreat",
//            "author_url" : "https://plus.google.com/110246682709687277403",
//            "language" : "en",
//            "rating" : 1,
//            "text" : "I spend 250 thousand dollars a year with Google adwords..\nI own a Mental Health Drug and alcohol retreat.\n\nA fictitious person Antony William posted a negative review on my Business.\n\nThis person has never attended.  I asked Google for the last 8 weeks to remove the third party review, I also sent 20 times a statutory declaration to googlemybusiness then goodle reviews and google legal stating Mr Antony had never attended the program.\n\nGoogle have refused to remove the review even though it clearly breaches Googles own guidelines and the post is defamatory.\nGoogle is enabling this person to continue to hurt our business by 100000 per month since the post went up.\n\nMy request for the post to be removed is being stone walled by google.\n\nI cannot believe that Google would treat their business partners so shabbily when they are being wronged by an anonymous person or I believe competition business.\nGoogle says over and over negotiate with Antony William,  how can I negotiate with someone who doesn't exist?  It is frustrating and plain wrong.\n\nIf Google does this to a client who spends 250000 ausd a year with them, god help us all.\n\nBy the way if you have depression and anxiety dealing with Google, come to us and we will help you. regards Francis",
//            "time" : 1468373176
//         },
//         {
//            "aspects" : [
//               {
//                  "rating" : 0,
//                  "type" : "overall"
//               }
//            ],
//            "author_name" : "Steve Morgan",
//            "author_url" : "https://plus.google.com/103384372688674733198",
//            "language" : "en",
//            "profile_photo_url" : "//lh5.googleusercontent.com/-xCUbmlcbDas/AAAAAAAAAAI/AAAAAAAAIAE/OLWRkcph3xs/photo.jpg",
//            "rating" : 1,
//            "text" : "Latest Andriod update 5.0 has broken Google  Play for the Samsung Note  3. No Gmail Apo no fitbit exercise  logging.  Absolutely  disgusting.  Almost sebds ne to Apple",
//            "time" : 1468325696
//         },
//         {
//            "aspects" : [
//               {
//                  "rating" : 3,
//                  "type" : "overall"
//               }
//            ],
//            "author_name" : "Nila Sweeney",
//            "author_url" : "https://plus.google.com/115167791509064907883",
//            "language" : "en",
//            "profile_photo_url" : "//lh4.googleusercontent.com/-P-5LDZmJbig/AAAAAAAAAAI/AAAAAAAAvPI/HdTFK_gE49Y/photo.jpg",
//            "rating" : 5,
//            "text" : "Amazing place!  So incredibly vibrant and hip. I love the way the office have been laid out. The way work-life balance is encouraged is truly impressive!  Google, please hire me! ",
//            "time" : 1464213084
//         },
//         {
//            "aspects" : [
//               {
//                  "rating" : 3,
//                  "type" : "overall"
//               }
//            ],
//            "author_name" : "Justine OBRIEN",
//            "author_url" : "https://plus.google.com/104177669626132953795",
//            "language" : "en",
//            "profile_photo_url" : "//lh6.googleusercontent.com/-s6AzNe5Qcco/AAAAAAAAAAI/AAAAAAAAFTE/NvVzCuI-jMI/photo.jpg",
//            "rating" : 5,
//            "text" : "Fabulous location. Wonderful warm welcoming reception. Excellent unique living Google wall entry. Sensational helpful kind people. Easy fast efficient help online plus with appointment on site. Super company always progressive plus innovative products and services for all businesses. ",
//            "time" : 1470531652
//         },
//         {
//            "aspects" : [
//               {
//                  "rating" : 3,
//                  "type" : "overall"
//               }
//            ],
//            "author_name" : "Aaron C",
//            "author_url" : "https://plus.google.com/114249054191749873014",
//            "language" : "en",
//            "profile_photo_url" : "//lh5.googleusercontent.com/-4cMZWIqYOaM/AAAAAAAAAAI/AAAAAAABJRM/e6txrDr9qZ4/photo.jpg",
//            "rating" : 5,
//            "text" : "I didn't like living in Sydney but I did like working at Google. A great place to work full of some of the best and smartest people I have ever worked with. Highly recommended.",
//            "time" : 1470483727
//         }
//      ],
//      "scope" : "GOOGLE",
//      "types" : [ "point_of_interest", "establishment" ],
//      "url" : "https://maps.google.com/?cid=10281119596374313554",
//      "utc_offset" : 600,
//      "vicinity" : "5 48 Pirrama Rd, Pyrmont",
//      "website" : "https://www.google.com.au/about/careers/locations/sydney/"
//   };
// }
