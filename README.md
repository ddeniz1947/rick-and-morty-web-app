**Rick and Morty Web Project Documentation**

Rick and Morty React projesinin dökümentasyonudur.

Proje içinde “Rick and Morty” animasyon dizisinin verilerini içeren API kullanılmıştır. 

4 sayfadan oluşmaktadır, bunlar : Dizi bölümlerinin hepsinin listelendiği sayfa (ana sayfa), dizi detay sayfası , karakterlerin hepsinin listelendiği sayfa , karakter detay sayfası şeklindedir.

**#Setup**

Proje ilk defa clone edildiğinde , gerekli paketlerin kurulması için , package.json dosyasının bulunduğu dizinde “npm install” komutunun çalıştırılması gereklidir. Ardından proje “npm start” komutu ile çalıştırılabilir. (Npm ‘in projenin çalıştırılacağı makinada kurulu olması gerekmektedir.)

**#Structures**

• Routing yapısı react-router-dom ile sağlanmıştır. Component tree desteği bu şekilde sağlanarak , sayfalar arasında geçiş sağlanmıştır.

• Propslar ile componentler arası veri aktarımı yapılmıştır.

• Farklı hooklar (useEffect , useState) detaylıca kullanılarak state’e etki edilmiştir.

• API ‘den veri çekmek için fetch yapısı kullanılmış bu yapının devamlılığı sebebiyle ayrı bir javascript dosyası içinde tekrar kullanılabilir bir asenkron fetch metodu tanımlanmış ve kullanılmıştır.

• API’den gelen JSON tipinde veri parse edilerek state yönetimiyle birlikte ekranlarda gösterilmiş, dinamik yapılar içinde kullanılmıştır.

• Responsive bir tasarım uygulanmıştır; sayfalarda kullanılan yapılar buna göre css ile kodlanmıştır.

**#Routing**

/ => Kök Dizin (İlk Açılan Ekran) ve dizi bölümlerinin bulunduğu sayfadır.

/episodeDetail => Dizi detay sayfası

/characters => Dizi karakterlerinin hepsinin listelendiği sayfa

/characterDetail => Karakter detay sayfası

Sağ üstteki menü kullanılarak karakterlerin ve bölümlerin listelendiği sayfalara gidilebilir. Detay sayfalarına bu sayfalar üzerinden gidilebilir.

