## Requests

**>for paging** count=5000&startIndex=5000

Example:
First ten features:
http://localhost:8080/geoserver/topp/owsservice=WFS&version=1.0.0&request=GetFeature
&typeName=topp:states&outputFormat=csv&propertyName=STATE_NAME,PERSONS
&maxFeatures=10
FID,STATE_NAME,PERSONS
states.1,Illinois,11430602
states.2,District of Columbia,606900
states.3,Delaware,666168
states.4,West Virginia,1793477
states.5,Maryland,4781468
states.6,Colorado,3294394
states.7,Kentucky,4551524
states.8,Kansas,2477574
states.9,Virginia,6180651
states.10,Missouri,5117073
The next 10 features:
http://localhost:8080/geoserver/topp/ows?service=WFS&version=1.0.0&request=GetFeature
&typeName=topp:states&outputFormat=csv&propertyName=STATE_NAME,PERSONS
&maxFeatures=10&startIndex=10
FID,STATE_NAME,PERSONS
states.11,Arizona,3665228
states.12,Oklahoma,3145585
states.13,North Carolina,6628629
states.14,Tennessee,4829958
states.15,Texas,17122020
states.16,New Mexico,1379559
states.17,Alabama,4040587
states.18,Mississippi,2573216
states.19,Georgia,6457339
states.20,South Carolina,3486703
