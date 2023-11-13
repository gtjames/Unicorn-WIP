window._config = {
    cognito: {
        userPoolId:        'us-east-1_OcE0QEkMG',    // 'us-east-1_6Njhn1oi1',          // e.g. us-east-1_PZ1irZLMc
        userPoolClientId:  '3uurcfoq1mp5do27atuk64c9ep', // '49d2qubnhtndnml5chlf25f1r',   // e.g. 56kf3jkb80icko329g1koap8f6
        region:             'us-east-1'          // e.g. us-east-2
    },
    api: {
        invokeUrl:         'https://ww3cb99tv8.execute-api.us-east-1.amazonaws.com/prod',// 'https://7hkr3oyeg4.execute-api.us-east-1.amazonaws.com/dev'          // e.g. https://rc7nyt4tql.execute-api.us-west-2.amazonaws.com/prod',
    }
};
// eyJraWQiOiI0cmF6RFdMSkpGd0lVZWNPVU56XC9PVGJBQm5vNGxicmZBbmZ4SmFPaVE0cz0iLCJhbGciOiJSUzI1NiJ9.eyJzdWIiOiIxMGExOTEyNS0xNDAyLTQxOWItYWFmYy00MjhiYjI0ODQyYWEiLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwiaXNzIjoiaHR0cHM6XC9cL2NvZ25pdG8taWRwLnVzLWVhc3QtMS5hbWF6b25hd3MuY29tXC91cy1lYXN0LTFfT2NFMFFFa01HIiwiY29nbml0bzp1c2VybmFtZSI6InR4amFtZXNnYW5nLWF0LXlhaG9vLmNvbSIsIm9yaWdpbl9qdGkiOiIyMzcyNDM1My1kYTZlLTRiMTYtOWY3ZC01NGM4OTNlYWZhMzQiLCJhdWQiOiIzdXVyY2ZvcTFtcDVkbzI3YXR1azY0YzllcCIsImV2ZW50X2lkIjoiZDEzYzFkODMtZDhkMi00MGJjLThlYTEtYjRhYzYzY2M3YjM1IiwidG9rZW5fdXNlIjoiaWQiLCJhdXRoX3RpbWUiOjE2OTk5MDUwNjksImV4cCI6MTY5OTkwODY2OSwiaWF0IjoxNjk5OTA1MDY5LCJqdGkiOiJkZDljNjE0NC00YWY2LTQxMmMtODJiYy1lYmU5MDk3ZjRlZDgiLCJlbWFpbCI6InR4amFtZXNnYW5nQHlhaG9vLmNvbSJ9.a0HeO2BjIFiJM0U2NxT8Y8HC8EvuZx8KcawK5ox3XCJA2YufL_218VaQo01erlTtQD1uxQwJm7Db3S8U2AtVOqwGhebyaHCA40leU5F_uCKdJo8cScsJBxN6oXvAGJ3Nb_q8XOInWPhD5cjSJcdFF3weLpxNfxGEDvEVfTsGxjZHDj3ekqko_0IVDzfsOtVqvIv9CsTCESBA8g3cybGAbh42soAB7B3SoIvjC2g24SYVo2jyfrzrQ87bmCli-yXpH2lwIt5ViyD-iXk7a52TciOWXQAVKxI3-CMQJcoN3omBoos6lCLYwMgYQvwbrgQShVRm7SrhoPgUh6uD22NMew

// eyJraWQiOiI0cmF6RFdMSkpGd0lVZWNPVU56XC9PVGJBQm5vNGxicmZBbmZ4SmFPaVE0cz0iLCJhbGciOiJSUzI1NiJ9.eyJzdWIiOiIzNjVkODdhZS03YTc3LTQwNTMtYTAxNi0zNzBkNWZhZmEyOTciLCJlbWFpbF92ZXJpZmllZCI6ZmFsc2UsImlzcyI6Imh0dHBzOlwvXC9jb2duaXRvLWlkcC51cy1lYXN0LTEuYW1hem9uYXdzLmNvbVwvdXMtZWFzdC0xX09jRTBRRWtNRyIsImNvZ25pdG86dXNlcm5hbWUiOiJndGphbWVzLWF0LWdtYWlsLmNvbSIsIm9yaWdpbl9qdGkiOiI0MmU1OTM4My1kYmQ3LTQ2NWUtYTkyMC0xNGUwNTkyMmZiZmQiLCJhdWQiOiIzdXVyY2ZvcTFtcDVkbzI3YXR1azY0YzllcCIsImV2ZW50X2lkIjoiNGNhMmU4N2QtNTQ2ZS00YWNjLWJmM2EtNjAzMjIwMjA2ZmNiIiwidG9rZW5fdXNlIjoiaWQiLCJhdXRoX3RpbWUiOjE2OTk5MDU5NDUsImV4cCI6MTY5OTkwOTU0NSwiaWF0IjoxNjk5OTA1OTQ1LCJqdGkiOiIyMGYyYWU4Mi1hNGE4LTQzMGEtODBiMS1jZjk3NDA3MzgzYWUiLCJlbWFpbCI6Imd0amFtZXNAZ21haWwuY29tIn0.X47FG1aP0_FJw-fWf3rviayZGPlfjq5B0cRRSKMATCbP6_GrKEP5FWi0ngheJyQG3ZuoXtS3_bAeq3T0VGKGYgkbAJik_U0XNzGVP80ukif7mf1TrM4tnX0s5y2LlR-MGBBPqPQfhkewN5z26y9S78pGO74J9ucMhyyzmAAM859wUNRXcXadevESiUXKqeqT9ICblMS_klGTcDx40SHz22dzDKm1h1Wt7NXrqbC0DJbJnv-QpyJghmaNS79NU26bWPS_KgbUZ9epPen0zshLJTvmqme1k8maSp20nD9i_ULmOomu79gyEyRjZ-uUMCjE9xg_ti4JylYLC0xr4RRUCQ