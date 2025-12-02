import { AppData, generateId } from './types';

export const LOCATIONS: Record<string, { lat: number; lon: number; name: string }> = {
    tokyo: { lat: 35.6895, lon: 139.6917, name: '東京' },
    yokohama: { lat: 35.4437, lon: 139.6380, name: '橫濱' },
    kamakura: { lat: 35.3192, lon: 139.5467, name: '鎌倉' },
    kawagoe: { lat: 35.9251, lon: 139.4858, name: '川越' },
    nikko: { lat: 36.7199, lon: 139.6982, name: '日光' }
};

const INITIAL_PACKING_LIST = [
    { id: generateId(), category: '證件/錢包', text: '護照 (效期6個月以上)', checked: false },
    { id: generateId(), category: '證件/錢包', text: '日幣現金', checked: false },
    { id: generateId(), category: '證件/錢包', text: '信用卡 (海外回饋高)', checked: false },
    { id: generateId(), category: '證件/錢包', text: 'Visit Japan Web QR Code 截圖', checked: false },
    { id: generateId(), category: '電子產品', text: '手機 & 充電線', checked: false },
    { id: generateId(), category: '電子產品', text: '行動電源', checked: false },
    { id: generateId(), category: '電子產品', text: '網卡/漫遊開通', checked: false },
    { id: generateId(), category: '衣物', text: '保暖外套 (1-2月均溫5度)', checked: false },
    { id: generateId(), category: '衣物', text: '好走的鞋', checked: false },
    { id: generateId(), category: '生活用品', text: '常備藥品 (感冒/胃藥/OK繃)', checked: false },
    { id: generateId(), category: '生活用品', text: '折疊傘', checked: false },
];

export const DEFAULT_DATA: AppData = {
    currencyRate: 0.215,
    members: ["我", "旅伴A", "旅伴B"],
    expenses: [],
    packingList: INITIAL_PACKING_LIST,
    reservations: [
        { id: generateId(), type: 'flight', name: '去程 BR198', status: 'booked', dateTime: '1/28 08:50', refNumber: '6F3X9A', notes: '桃園 T2 -> 成田 T1', url: '' },
        { id: generateId(), type: 'flight', name: '回程 BR197', status: 'booked', dateTime: '2/3 13:00', refNumber: '6F3X9A', notes: '成田 T1 -> 桃園 T2', url: '' },
        { id: generateId(), type: 'hotel', name: 'Dormy Inn Kawasaki', status: 'booked', dateTime: '1/28 - 1/30', notes: '神奈川県川崎市川崎区東田町9-3 (+81-44-230-5489)', url: 'https://www.google.com/maps/search/?api=1&query=Dormy+Inn+Kawasaki' },
        { id: generateId(), type: 'hotel', name: '東橫INN 淺草藏前2號店', status: 'booked', dateTime: '1/30 - 2/3', notes: '東京都台東区蔵前3-15-5 (+81-3-5821-1045)', url: 'https://www.google.com/maps/search/?api=1&query=Toyoko+Inn+Asakusa+Kuramae' },
    ],
    days: [
        {
            date: "1/28", weekday: "週三",
            title: "抵達與橫濱港夜景",
            weather: "晴時多雲 4-11°C",
            locationKey: "yokohama",
            imageUrl: "./yokohama.jpg",
            mealOptions: {
                breakfast: [
                    { id: generateId(), name: "機場貴賓室/便利商店", dish: "飯糰/三明治", priceLevel: "¥500", url: "", locationUrl: "", note: "快速解決" }
                ],
                lunch: [
                    { id: generateId(), name: "Skyliner 便當", dish: "炸豬排三明治", priceLevel: "¥1000", url: "", locationUrl: "", note: "車上享用" }
                ],
                dinner: [
                    { id: generateId(), name: "Lazona 川崎廣場", dish: "金子半之助/利久牛舌", priceLevel: "¥1500~", url: "https://www.google.com/search?q=Lazona+Kawasaki+Restaurants", locationUrl: "https://maps.google.com/?q=Lazona+Kawasaki", note: "川崎站直結，選擇極多" },
                    { id: generateId(), name: "Bills 紅磚倉庫", dish: "Ricotta鬆餅", priceLevel: "¥2500", url: "https://billsjapan.com/jp/横浜赤レンガ倉庫", locationUrl: "https://maps.google.com/?q=Bills+Yokohama+Red+Brick", note: "氣氛佳，需預約" },
                    { id: generateId(), name: "Afuri 拉麵", dish: "柚子鹽拉麵", priceLevel: "¥1200", url: "https://afuri.com/", locationUrl: "https://maps.google.com/?q=Afuri+Yokohama+Landmark", note: "橫濱地標塔店，清爽系" }
                ]
            },
            events: [
                { 
                    id: generateId(), time: "08:50", type: "transport", title: "起飛 BR198", loc: "桃園機場 T1", image: "./airport.jpg", note: "06:30 集合", 
                    subItems: [{id: generateId(), type: 'do', text: '領取Wifi機', checked: false}, {id: generateId(), type: 'buy', text: '免稅化妝品', checked: false}],
                    transitToNext: { mode: 'other', duration: '3h 30m', note: '飛行時間' } 
                },
                { 
                    id: generateId(), time: "12:55", type: "transport", title: "抵達", loc: "成田機場 T1", image: "./narita.jpg", note: "領取 Skyliner, Suica",
                    subItems: [{id: generateId(), type: 'buy', text: 'Suica卡 (儲值¥3000)', checked: false}],
                    transitToNext: { mode: 'train', duration: '50m', note: 'Skyliner (成田->京成上野)' }
                },
                { 
                    id: generateId(), time: "14:00", type: "transport", title: "移動：成田→川崎", loc: "Skyliner", image: "./skyliner.jpg", note: "轉 JR 上野東京線",
                    transitToNext: { mode: 'train', duration: '40m', note: 'JR 上野東京線 (上野->川崎)' }
                },
                { 
                    id: generateId(), time: "16:00", type: "hotel", title: "Check-in", loc: "Dormy Inn", image: "./kawasaki_inn.jpg", note: "享受迎賓咖啡",
                    subItems: [{id: generateId(), type: 'do', text: '確認溫泉開放時間', checked: false}],
                    transitToNext: { mode: 'train', duration: '20m', note: 'JR京濱東北線 (川崎->櫻木町)' }
                },
                { 
                    id: generateId(), time: "17:30", type: "sight", title: "紅磚倉庫公園", loc: "橫濱", image: "./yo.jpg", tags: ["必拍:夜景"], desc: "充滿異國情調的歷史倉庫群，適合散步拍照。",
                    subItems: [{id: generateId(), type: 'buy', text: '橫濱焦糖牛奶糖', checked: false}, {id: generateId(), type: 'eat', text: '崎陽軒燒賣', checked: false}],
                    transitToNext: { mode: 'walk', duration: '10m', note: '步行至運河公園站' }
                },
                { 
                    id: generateId(), time: "20:30", type: "sight", title: "橫濱空中纜車", loc: "櫻木町站", image: "./air_cabin.jpg", note: "單程 1000円，欣賞港未來全景。",
                    subItems: [{id: generateId(), type: 'do', text: '錄下夜景縮時', checked: false}],
                    transitToNext: { mode: 'train', duration: '15m', note: 'JR京濱東北線回川崎' }
                },
                { 
                    id: generateId(), time: "22:00", type: "food", title: "夜鳴拉麵 & 溫泉", loc: "Dormy Inn", image: "./dormy_ramen.jpg", tags: ["溫泉","免費拉麵","免費冰棒","乳酸飲料"], desc: "飯店招牌服務，泡湯後享用免費醬油拉麵。" 
                }
            ]
        },
        {
            date: "1/29", weekday: "週四",
            title: "湘南海岸與江之島",
            weather: "晴天 5-12°C",
            locationKey: "kamakura",
            imageUrl: "./bridge_enoshima.jpg",
            mealOptions: {
                breakfast: [
                    { id: generateId(), name: "飯店早餐", dish: "自助餐", priceLevel: "已含", url: "", locationUrl: "", note: "吃飽再出發" }
                ],
                lunch: [
                    { id: generateId(), name: "Tobiccho 本店", dish: "魩仔魚丼", priceLevel: "¥1800", url: "https://tobiccho.com/", locationUrl: "https://maps.app.goo.gl/xxx", note: "江之島排隊名店，可抽整理券" },
                    { id: generateId(), name: "魚見亭", dish: "海鮮丼", priceLevel: "¥2000", url: "https://enoshima-uomitei.com/", locationUrl: "https://maps.app.goo.gl/xxx", note: "懸崖邊戶外座位，景色無敵" }
                ],
                dinner: [
                    { id: generateId(), name: "AFURI 橫濱", dish: "柚子拉麵", priceLevel: "¥1200", url: "https://afuri.com/", locationUrl: "https://maps.app.goo.gl/xxx", note: "回程經過橫濱吃" },
                    { id: generateId(), name: "磯丸水產", dish: "蟹味噌甲羅燒", priceLevel: "¥2000", url: "", locationUrl: "https://maps.app.goo.gl/xxx", note: "川崎站前有分店，24小時營業" }
                ]
            },
            events: [
                { 
                    id: generateId(), time: "09:00", type: "sight", title: "新江之島水族館", loc: "江之島", image: "./aqu.jpg", tags: ["推薦:水母廳"], desc: "相模灣大水槽與夢幻水母廳。",
                    subItems: [{id: generateId(), type: 'do', text: '看海豚表演', checked: false}, {id: generateId(), type: 'buy', text: '水母玩偶', checked: false}],
                    transitToNext: { mode: 'walk', duration: '10m', note: '步行過橋' }
                },
                { 
                    id: generateId(), time: "11:30", type: "food", title: "仲見世通吃透透", loc: "江之島老街", image: "./street_enoshima.jpg", tags: ["章魚仙貝", "魩仔魚"], desc: "參拜江島神社，購買手扶梯套票，邊走邊吃。", 
                    subItems: [{id: generateId(), type: 'eat', text: '朝日堂 整隻龍蝦仙貝', checked: false}, {id: generateId(), type: 'eat', text: '紀之國屋女夫饅頭', checked: false}],
                    transitToNext: { mode: 'walk', duration: '20m', note: '搭乘手扶梯至頂端' }
                },
                { 
                    id: generateId(), time: "13:00", type: "sight", title: "海蠟燭展望燈塔", loc: "江之島頂", image: "./candle.jpg", desc: "天氣好可眺望富士山。",
                    transitToNext: { mode: 'walk', duration: '15m', note: '往下走至奧津宮方向' }
                },
                { 
                    id: generateId(), time: "14:00", type: "food", title: "午餐：魚見亭", loc: "江之島懸崖", image: "./restaurant_enoshima.jpg", tags: ["絕景戶外座"], desc: "坐在懸崖邊看海吃海鮮丼，視野極佳。",
                    transitToNext: { mode: 'walk', duration: '10m', note: '步行至岩屋' }
                },
                { 
                    id: generateId(), time: "15:30", type: "sight", title: "岩屋", loc: "江之島後山", image: "./cave.jpg", desc: "海蝕平台與洞窟，絕美夕陽名所。",
                    subItems: [{id: generateId(), type: 'do', text: '拍富士山夕陽', checked: false}],
                    transitToNext: { mode: 'walk', duration: '20m', note: '搭乘弁天丸遊覽船回橋頭(視風浪)' }
                },
                { 
                    id: generateId(), time: "17:00", type: "transport", title: "湘南單軌電車", loc: "湘南江之島", image: "./monorail.jpg", note: "倒掛式電車，像雲霄飛車般刺激。",
                    transitToNext: { mode: 'train', duration: '30m', note: '大船轉車回川崎' }
                }
            ]
        },
        {
            date: "1/30", weekday: "週五",
            title: "鎌倉古都與晴空塔",
            weather: "多雲 4-10°C",
            locationKey: "kamakura",
            imageUrl: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?q=80&w=800&auto=format&fit=crop",
            mealOptions: {
                breakfast: [
                    { id: generateId(), name: "Bills 七里濱", dish: "Ricotta鬆餅", priceLevel: "¥2200", url: "https://billsjapan.com/", locationUrl: "https://maps.app.goo.gl/xxx", note: "需提前兩週預約窗邊位" }
                ],
                lunch: [
                    { id: generateId(), name: "Caraway", dish: "牛肉咖哩", priceLevel: "¥900", url: "", locationUrl: "https://maps.app.goo.gl/xxx", note: "鎌倉排隊名店，CP值高" },
                    { id: generateId(), name: "Oxymoron", dish: "和風肉末咖哩", priceLevel: "¥1500", url: "https://www.oxymoron.jp/", locationUrl: "https://maps.app.goo.gl/xxx", note: "小町通巷內文青店" }
                ],
                dinner: [
                    { id: generateId(), name: "利久牛舌", dish: "牛舌定食", priceLevel: "¥2500", url: "https://www.rikyu-gyutan.co.jp/", locationUrl: "https://maps.app.goo.gl/xxx", note: "晴空塔6F，厚切牛舌必吃" },
                    { id: generateId(), name: "六厘舍", dish: "特製沾麵", priceLevel: "¥1100", url: "https://www.rokurinsha.com/", locationUrl: "https://maps.app.goo.gl/xxx", note: "晴空塔6F，麵條Q彈" },
                    { id: generateId(), name: "Toriton 迴轉壽司", dish: "北海道時令壽司", priceLevel: "¥3000", url: "http://toriton-kita1.jp/", locationUrl: "https://maps.app.goo.gl/xxx", note: "晴空塔6F，來自北海道的超人氣店" }
                ]
            },
            events: [
                { 
                    id: generateId(), time: "10:00", type: "food", title: "bills 早午餐", loc: "七里ヶ浜", image: "./bills.jpg", tags: ["必吃:鬆餅", "預約"], desc: "號稱世界第一早餐，海景第一排。",
                    transitToNext: { mode: 'train', duration: '15m', note: '江之電 (七里濱->長谷)' }
                },
                { 
                    id: generateId(), time: "12:00", type: "sight", title: "鎌倉大佛", loc: "高德院", image: "./buddha.jpg", desc: "國寶銅造阿彌陀如來坐像。",
                    subItems: [{id: generateId(), type: 'do', text: '進入大佛胎內參觀(¥50)', checked: false}],
                    transitToNext: { mode: 'train', duration: '10m', note: '江之電 (長谷->鎌倉)' }
                },
                { 
                    id: generateId(), time: "13:30", type: "sight", title: "鶴岡八幡宮", loc: "鎌倉", image: "./kamakura.jpg", tags: ["小町通"], desc: "鎌倉地標，參道非常熱鬧，有許多小吃。",
                    subItems: [{id: generateId(), type: 'buy', text: '豐島屋 鴿子餅乾', checked: false}, {id: generateId(), type: 'eat', text: 'Kamakura Chacha 抹茶霜淇淋', checked: false}, {id: generateId(), type: 'eat', text: '夢見屋 糰子', checked: false}],
                    transitToNext: { mode: 'train', duration: '60m', note: 'JR橫須賀線 -> 淺草線 (直通)' }
                },
                { 
                    id: generateId(), time: "16:00", type: "transport", title: "Check-in 淺草", loc: "東橫INN", image: "./inn.jpg", tags: ["小町通"], note: "寄放行李、稍作休息",
                    transitToNext: { mode: 'train', duration: '5m', note: '淺草線 (淺草->押上)' }
                },
                { 
                    id: generateId(), time: "19:00", type: "food", title: "晴空塔", loc: "押上", image: "./skytree.jpg", tags: ["必逛", "晚餐"], desc: "購物商城，六厘舍沾麵、利久牛舌都在這。",
                    subItems: [{id: generateId(), type: 'buy', text: 'Tokyo Banana (晴空塔限定豹紋)', checked: false}, {id: generateId(), type: 'buy', text: 'Press Butter Sand', checked: false}, {id: generateId(), type: 'do', text: '寶可夢中心', checked: false}]
                }
            ]
        },
        {
            date: "1/31", weekday: "週六",
            title: "小江戶川越",
            weather: "晴天 3-11°C",
            locationKey: "kawagoe",
            imageUrl: "https://images.unsplash.com/photo-1564595346493-7e525384a6e5?q=80&w=800&auto=format&fit=crop",
            mealOptions: {
                breakfast: [
                    { id: generateId(), name: "便利商店", dish: "咖啡/麵包", priceLevel: "¥400", url: "", locationUrl: "", note: "" }
                ],
                lunch: [
                    { id: generateId(), name: "小川菊", dish: "鰻魚飯", priceLevel: "¥4000", url: "https://www.ogakiku.com/", locationUrl: "https://maps.app.goo.gl/xxx", note: "百年老店，務必開門前排隊" },
                    { id: generateId(), name: "川越釜飯 Torisei", dish: "釜飯定食", priceLevel: "¥1500", url: "http://www.torisei.net/", locationUrl: "https://maps.app.goo.gl/xxx", note: "排隊名店，雞肉釜飯很香" },
                    { id: generateId(), name: "Hayashiya", dish: "鰻魚飯", priceLevel: "¥3500", url: "", locationUrl: "", note: "老街上的另一選擇" }
                ],
                dinner: [
                    { id: generateId(), name: "無敵家", dish: "豚骨拉麵", priceLevel: "¥1200", url: "https://mutekiya.com/", locationUrl: "https://maps.app.goo.gl/xxx", note: "池袋名店，回程順路吃" },
                    { id: generateId(), name: "活美登利壽司", dish: "迴轉壽司", priceLevel: "¥2500", url: "https://katumidori.co.jp/", locationUrl: "https://maps.app.goo.gl/xxx", note: "池袋西武百貨8F，CP值高" }
                ]
            },
            events: [
                { 
                    id: generateId(), time: "09:00", type: "transport", title: "前往川越", loc: "池袋站", image: "./kawagoePass.png", note: "購買東武川越周遊券",
                    transitToNext: { mode: 'train', duration: '30m', note: '東武東上線急行' }
                },
                { 
                    id: generateId(), time: "10:30", type: "sight", title: "冰川神社", loc: "川越", image: "./hikawa.jpg", tags: ["體驗:釣鯛魚"], desc: "求姻緣名所，繪馬隧道必拍。",
                    subItems: [{id: generateId(), type: 'do', text: '釣紅色鯛魚(求平安)', checked: false}, {id: generateId(), type: 'do', text: '釣粉色鯛魚(求良緣)', checked: false}, {id: generateId(), type: 'do', text: '放人形流(除穢)', checked: false}],
                    transitToNext: { mode: 'bus', duration: '10m', note: '東武巴士' }
                },
                { 
                    id: generateId(), time: "12:00", type: "food", title: "川越釜飯 Torisei", loc: "川越", image: "./torisei.jpg", desc: "招牌菜是「川越釜飯定食」（鰻魚塊配川越名物番薯）及「鳥もも炭火焼定食」。",
                    transitToNext: { mode: 'walk', duration: '5m', note: '步行' }
                },
                { 
                    id: generateId(), time: "13:00", type: "food", title: "小川菊 鰻魚飯", loc: "川越", image: "./mini_unagi.jpg", tags: ["必吃:鰻魚"], desc: "百年老店，炭烤香氣十足。若太久可改吃'傳米'，傳米有提供迷你鰻魚飯。",
                    transitToNext: { mode: 'walk', duration: '5m', note: '步行至一番街' }
                },
                { 
                    id: generateId(), time: "14:00", type: "sight", title: "藏造老街", loc: "一番街", image: "./oldstreet.jpg", tags: ["龜屋銅鑼燒","川越布丁","小江戶大花-玉子燒"], desc: "在川越的主要街道「小江戶川越一番街商店街」裡...",
                    subItems: [{id: generateId(), type: 'eat', text: '川越布丁 (川越プリン)', checked: false}, {id: generateId(), type: 'eat', text: '小江戶大花 棍狀玉子燒', checked: false}, {id: generateId(), type: 'eat', text: '紫薯冰淇淋', checked: false}],
                    transitToNext: { mode: 'walk', duration: '5m', note: '步行' }
                },
                { 
                    id: generateId(), time: "15:00", type: "sight", title: "時之鐘", loc: "一番街", image: "./toki.jpg", tags: ["龜屋銅鑼燒"], desc: "時之鐘是一個高約16公尺的木製鐘樓，現在是川越的地標性建築。",
                    subItems: [{id: generateId(), type: 'buy', text: '龜屋 銅鑼燒', checked: false}],
                    transitToNext: { mode: 'walk', duration: '10m', note: '步行' }
                },
                { 
                    id: generateId(), time: "15:30", type: "sight", title: "大正浪漫夢通", loc: "川越", image: "./taisei.jpg", desc: "位在川越的「大正浪漫夢通り」是一條充滿懷舊氛圍的歷史商店街。",
                    transitToNext: { mode: 'walk', duration: '5m', note: '步行' }
                },
                { 
                    id: generateId(), time: "16:00", type: "sight", title: "熊野神社", loc: "川越", image: "./kumano.jpg", tags:["錢洗弁財天","水晶球","套圈圈"], desc: "川越熊野神社是一座歷史悠久的開運、結緣神社。",
                    subItems: [{id: generateId(), type: 'do', text: '洗錢弁財天', checked: false}, {id: generateId(), type: 'do', text: '健康步道', checked: false}],
                    transitToNext: { mode: 'train', duration: '45m', note: '回池袋/淺草' }
                }
            ]
        },
        {
            date: "2/1", weekday: "週日",
            title: "日光世界遺產",
            weather: "雪/雨 0-5°C",
            locationKey: "nikko",
            imageUrl: "https://images.unsplash.com/photo-1528563351349-6456908d6e45?q=80&w=800&auto=format&fit=crop",
            mealOptions: {
                breakfast: [
                    { id: generateId(), name: "Spacia X 車內販售", dish: "精釀啤酒/咖啡", priceLevel: "¥600", url: "", locationUrl: "", note: "車上Cafe" }
                ],
                lunch: [
                    { id: generateId(), name: "油源", dish: "湯波(豆皮)料理", priceLevel: "¥2000", url: "https://www.aburagen.jp/", locationUrl: "https://maps.app.goo.gl/xxx", note: "日光名物，健康美味" },
                    { id: generateId(), name: "Meiji-no-Yakata", dish: "蛋包飯/起司蛋糕", priceLevel: "¥2500", url: "http://www.meiji-yakata.com/", locationUrl: "https://maps.app.goo.gl/xxx", note: "明治之館，洋食名店" },
                    { id: generateId(), name: "Komekichi Kozushi", dish: "日光湯波壽司", priceLevel: "¥1800", url: "", locationUrl: "https://maps.app.goo.gl/xxx", note: "創意壽司" }
                ],
                dinner: [
                    { id: generateId(), name: "淺草 牛炸(Gyukatsu)", dish: "炸牛排", priceLevel: "¥1800", url: "https://www.asakusa-gyukatsu.com/", locationUrl: "https://maps.app.goo.gl/xxx", note: "雷門對面，人氣排隊店" },
                    { id: generateId(), name: "Yoroiya 淺草拉麵", dish: "醬油拉麵", priceLevel: "¥900", url: "https://yoroiya.jp/", locationUrl: "https://maps.app.goo.gl/xxx", note: "清淡系醬油拉麵，加入柚子提味" },
                    { id: generateId(), name: "大黑家", dish: "海老天丼", priceLevel: "¥2000", url: "http://www.tempura.co.jp/", locationUrl: "https://maps.app.goo.gl/xxx", note: "黑麻油炸天婦羅，口味較重" }
                ]
            },
            events: [
                { 
                    id: generateId(), time: "06:00", type: "transport", title: "SPACIA X (去程)", loc: "淺草站", image: "./spaciaX.jpg", tags: ["預約:必須"], desc: "最新奢華觀光列車。",
                    subItems: [{id: generateId(), type: 'eat', text: '車內限定 Craft Beer', checked: false}, {id: generateId(), type: 'eat', text: '日光意式冰淇淋', checked: false}],
                    transitToNext: { mode: 'train', duration: '1h 50m', note: '東武日光線' }
                },
                { 
                    id: generateId(), time: "09:30", type: "food", title: "炸湯波饅頭", loc: "日光Sakaeya", image: "./sakaeya.jpg", tags: ["必吃"], desc: "撒上鹽巴的炸豆皮饅頭，甜鹹絕配。",
                    subItems: [{id: generateId(), type: 'eat', text: '炸湯波饅頭', checked: false}],
                    transitToNext: { mode: 'bus', duration: '10m', note: '世界遺產巡遊巴士' }
                },
                { 
                    id: generateId(), time: "11:00", type: "sight", title: "日光世界遺產二社一寺", loc: "日光", image: "./Toshogu.jpg", tags: ["二荒山神社","東照宮","山輪王寺"], desc: "** 日光東照宮 **\n日光東照宮是供奉江戶幕府第一代將軍德川家康的神社...",
                    subItems: [{id: generateId(), type: 'do', text: '找「眠貓」', checked: false}, {id: generateId(), type: 'do', text: '找「三猿」(非禮勿視...)', checked: false}, {id: generateId(), type: 'do', text: '聽「鳴龍」回音', checked: false}],
                    transitToNext: { mode: 'walk', duration: '10m', note: '步行' }
                },
                { 
                    id: generateId(), time: "13:30", type: "food", title: "湯波料理午餐", loc: "油源", image: "./yuba.jpg", tags: ["湯波御膳"], desc: "日光名產豆皮料理。",
                    transitToNext: { mode: 'walk', duration: '15m', note: '步行' }
                },
                { 
                    id: generateId(), time: "15:30", type: "sight", title: "神橋", loc: "日光", image: "./hashi.jpg", desc: "朱紅色拱橋與雪景/溪流的對比。上橋要花錢，建議遠看就好。",
                    transitToNext: { mode: 'bus', duration: '10m', note: '巴士回車站' }
                },
                { 
                    id: generateId(), time: "16:30", type: "transport", title: "SPACIA X (回程)", loc: "東武日光站", image: "./spaciax.jpg", note: "在車上享用日光布丁或啤酒。",
                    transitToNext: { mode: 'train', duration: '2h', note: '回淺草' }
                }
            ]
        },
        {
            date: "2/2", weekday: "週一",
            title: "東京經典精選",
            weather: "多雲 5-12°C",
            locationKey: "tokyo",
            imageUrl: "https://images.unsplash.com/photo-1536098561742-ca998e48cbcc?q=80&w=800&auto=format&fit=crop",
            mealOptions: {
                breakfast: [
                    { id: generateId(), name: "Pelican Cafe", dish: "炭烤吐司", priceLevel: "¥800", url: "https://www.bakerpelican.com/", locationUrl: "https://maps.app.goo.gl/xxx", note: "淺草麵包老舖，需排隊" },
                    { id: generateId(), name: "February Cafe", dish: "焦糖布丁", priceLevel: "¥700", url: "", locationUrl: "https://maps.app.goo.gl/xxx", note: "使用Pelican吐司的文青咖啡店" }
                ],
                lunch: [
                    { id: generateId(), name: "淺草今半", dish: "壽喜燒午膳", priceLevel: "¥4000", url: "https://www.asakusaimahan.co.jp/", locationUrl: "https://maps.app.goo.gl/xxx", note: "百年老店，午餐CP值較高" },
                    { id: generateId(), name: "Namiki Yabusoba", dish: "鴨南蠻蕎麥麵", priceLevel: "¥1800", url: "https://yabusoba.co.jp/", locationUrl: "https://maps.app.goo.gl/xxx", note: "藪蕎麥御三家之一" }
                ],
                dinner: [
                    { id: generateId(), name: "根室花丸", dish: "迴轉壽司", priceLevel: "¥3000", url: "", locationUrl: "https://maps.app.goo.gl/xxx", note: "KITTE丸之內店，排隊名店" },
                    { id: generateId(), name: "Tsurutontan", dish: "大碗烏龍麵", priceLevel: "¥1500", url: "http://www.tsurutontan.co.jp/", locationUrl: "https://maps.app.goo.gl/xxx", note: "銀座Tokyu Plaza，碗比臉大" },
                    { id: generateId(), name: "銀座 篝 (Kagari)", dish: "雞白湯Soba", priceLevel: "¥1200", url: "", locationUrl: "https://maps.app.goo.gl/xxx", note: "米其林推薦，濃郁雞白湯" }
                ]
            },
            events: [
                { 
                    id: generateId(), time: "9:00", type: "food", title: "Pelican CAFE", loc: "田原町", image: "./pelican.jpg", tags: ["炭烤吐司"], desc: "淺草麵包老舖「鵜鶘麵包」人氣早餐，必點炸火腿三明治。",
                    transitToNext: { mode: 'walk', duration: '15m', note: '步行至雷門' }
                },
                { 
                    id: generateId(), time: "10:30", type: "sight", title: "淺草寺 & 雷門", loc: "淺草", image: "./asakusa.jpg", tags: ["初訪必去"], desc: "東京最古老寺廟，早上去人較少。",
                    subItems: [{id: generateId(), type: 'do', text: '求籤 (凶要綁在架上)', checked: false}, {id: generateId(), type: 'buy', text: '人形燒', checked: false}, {id: generateId(), type: 'eat', text: '花月堂 菠蘿麵包', checked: false}],
                    transitToNext: { mode: 'train', duration: '20m', note: '銀座線 (淺草->京橋/日本橋)' }
                },
                { 
                    id: generateId(), time: "13:00", type: "sight", title: "東京車站", loc: "丸之內", image: "./station.jpg", tags: ["伴手禮"], desc: "欣賞紅磚車站建築。",
                    subItems: [{id: generateId(), type: 'buy', text: 'NY Perfect Cheese', checked: false}, {id: generateId(), type: 'buy', text: 'NewYork City Sand', checked: false}],
                    transitToNext: { mode: 'train', duration: '15m', note: '丸之內線/JR (東京->赤羽橋)' }
                },
                { 
                    id: generateId(), time: "15:00", type: "sight", title: "東京鐵塔", loc: "芝公園", image: "./tokyo_tower.jpg", tags: ["必拍:全景"], desc: "坐在草地上與東京鐵塔合照。",
                    subItems: [{id: generateId(), type: 'do', text: '拍「地下停車場樓梯」網美照', checked: false}]
                },
            ]
        },
        {
            date: "2/3", weekday: "週二",
            title: "歸途",
            weather: "晴時多雲",
            locationKey: "tokyo",
            imageUrl: "https://images.unsplash.com/photo-1552654835-c468cb398fb8?q=80&w=800&auto=format&fit=crop",
            mealOptions: {
                breakfast: [
                    { id: generateId(), name: "飯店早餐", dish: "飯糰", priceLevel: "", url: "", locationUrl: "", note: "" }
                ],
                lunch: [
                    { id: generateId(), name: "壽司京辰", dish: "壽司", priceLevel: "¥3000", url: "", locationUrl: "", note: "成田機場管制區內，最後一頓美食" },
                    { id: generateId(), name: "麥當勞", dish: "培根馬鈴薯派", priceLevel: "¥500", url: "", locationUrl: "", note: "日本限定口味" }
                ],
                dinner: []
            },
            events: [
                { 
                    id: generateId(), time: "08:00", type: "hotel", title: "Check-out", loc: "東橫INN", image: "./inn.jpg", note: "檢查護照、錢包。",
                    transitToNext: { mode: 'walk', duration: '5m', note: '步行至車站' }
                },
                { 
                    id: generateId(), time: "08:30", type: "transport", title: "前往機場", loc: "Access特快", image: "./access.jpg", note: "直達成田 (約60分)。", 
                    transitToNext: { mode: 'train', duration: '60m', note: '直達特快' }
                },
                { 
                    id: generateId(), time: "10:12", type: "sight", title: "機場最後衝刺", loc: "成田 T2", image: "./naritaT.jpg", tags: ["免稅店"], desc: "購買白色戀人、Royce。",
                    subItems: [{id: generateId(), type: 'buy', text: 'Royce 生巧克力', checked: false}, {id: generateId(), type: 'buy', text: 'LeTAO 起司蛋糕', checked: false}, {id: generateId(), type: 'buy', text: '薯條三兄弟', checked: false}],
                    transitToNext: { mode: 'walk', duration: '30m', note: '登機口' }
                },
                { 
                    id: generateId(), time: "13:00", type: "transport", title: "起飛 BR197", loc: "成田機場", image: "./plane.jpg", note: "再見東京！" }
                ]
            }
        ]
};