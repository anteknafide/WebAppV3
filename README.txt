Problem jest taki że w user-login-component.ts nie moge wywołac funckji która importuje z categories.component.ts (czyli typescript strony sklepu) ta funkcja zmienia zmienne ktore odpowiadaja za wyswietlanie przyciskow dla  czyli wyloguj i admin panel

Probowalem na dwa sposoby
A) nie działa bo zmienne w klasie i te poza to sa totalnie inne i nie ma tak łatwo 
B) nie działa bo nie wiem co dać jako parametr w funckji w user-login-component.ts bo on wymaga APIService

Zeby to wszystko naprawic jedyne co musze to zmienic 2 wartosci boolean w categories-component.ts przez user-login-component.ts