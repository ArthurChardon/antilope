// https://gs.statcounter.com/search-engine-market-share
export const searchEngines = new Map<string, [string, number][]>([
    ['world', 
        [
            ['Google', 0.9242],
            ['Bing', 0.0345],
            ['Yahoo!', 0.0132],
            ['YANDEX', 0.0079],
            ['Baidu', 0.0065],
            ['DuckDuckGo', 0.0063]
        ]
    ],
    ['france', 
        [
            ['Google', 0.9128],
            ['Bing', 0.0502],
            ['Yahoo!', 0.0127],
            ['Ecosia', 0.0078],
            ['Qwant', 0.0066],
            ['DuckDuckGo', 0.0048]
        ]
    ],
]);

// https://gs.statcounter.com/browser-market-share
export const browsers = new Map<string, [string, number][]>([
    ['world', 
        [
            ['Chrome', 0.657],
            ['Safari', 0.1866],
            ['Edge', 0.0432],
            ['Firefox', 0.0314],
            ['Samsung Internet', 0.0275],
            ['Opera', 0.0225]
        ]
    ],
    ['france', 
        [
            ['Chrome', 0.5436],
            ['Safari', 0.2553],
            ['Edge', 0.0791],
            ['Firefox', 0.0542],
            ['Samsung Internet', 0.0286],
            ['Opera', 0.0171]
        ]
    ],
]);