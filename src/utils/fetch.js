import {
  charListVer,
  stageListVer,
  enemyListVer,
  dataPath,
  api,
  path
} from './listVer';

import store from '../store';

const setVer = (name, ver) => {
  store.commit(name, new Date(ver).toLocaleString());
};

const fetchPut = (url, data) => {
  return fetch(url, {
    method: 'PUT',
    body: JSON.stringify(data),
    headers: new Headers({
      'Content-Type': 'application/json'
    })
  }).then(res => res.json())
    .catch(err => Promise.reject(err));
};

const submitFeedback = content => {
  return fetchPut('/api/arknights/feedback', content)
    .catch(err => console.error(err))
    .then(res => Promise.resolve(res));
};

//包装fetch，使用get
const fetchGet = (url) => {
  return fetch(url, {
    method: 'GET',
    mode: 'cors'
  }).then(res => {
    if (res.ok) {
      return res.json();
    }
    else {
      return Promise.reject('server error');
    }
  });
};


const fetchGetSliceSet = (key, setKey) => {
  return fetchGet(api + 'data/' + key)
    .then(res => {
      if (setKey) setVer(setKey, res.lastModified);
      return fetchGet(path + res.name.slice(6));
    })
    .catch(err => {
      console.error('error', err);
      return [];
    });
};

const fetchByKey = (keyPath) => {
  return key => fetchGet(`${dataPath}/data/${keyPath}/${key}.json`)
    .catch(err => {
      console.error('error', err);
      return Promise.reject('no data');
    });
};




const getProfileList = () => fetchByKey('char/list')(charListVer);
const getStageList = () => fetchByKey('lists/stage')(stageListVer); //fetchGetSliceSet('stageList');
const getEnemyList = () => fetchByKey('lists/enemy')(enemyListVer); //fetchGetSliceSet('enemyList', 'setEnemyVer');


// 遗留api
const getEneAppearMap = () => fetchGetSliceSet('enemyAppearMap', 'setApperMapVer');
const getDevList = () => fetchGetSliceSet('devList', 'setListVer');

// 不用找服务器的list
const getThemeList = () => fetchByKey('custom')('themeslist');

const getHeroData = key => fetchByKey('char/data')(key);

const getEnemyData = key => fetchByKey('enemy')(key);

const getMapData = key => fetchByKey('map/data')(key);

const getMapDataListVer = key => fetchByKey('map/exData')(key);

const getCharInfo = key => fetchByKey('char/info')(key);

const getCharWords = key => fetchByKey('char/words')(key);

const getRange = key => fetchByKey('range')(key);

const getSkill = key => fetchByKey('skills')(key);

const getItem = key => fetchByKey('item')(key);

const getFurn = key => fetchByKey('custom/furnitures')(key);

const getCharItem = key => fetchByKey('item')('p_' + key);


const importScript = (url, init = () => console.log('load')) => {
  const body = document.querySelector('head');
  const script = document.createElement('script');
  script.type = 'text/javascript';
  script.onload = init;
  script.src = url;
  body.appendChild(script);
};

const importEcharts = (init) => {
  importScript('https://cdn.bootcss.com/echarts/4.3.0-rc.1/echarts.common.min.js', init);
};

const importSpriteJs = (init) => {
  importScript('https://unpkg.com/spritejs/dist/spritejs.min.js', init);
};


export {
  fetchGet,
  fetchByKey,


  getProfileList,
  getEnemyData,
  getEneAppearMap,
  getDevList,
  getEnemyList,
  submitFeedback,
  getThemeList,
  importSpriteJs,
  importEcharts,

  // api 类，需要提供key
  getHeroData,
  getCharInfo,
  getCharWords,
  getSkill,
  getMapData,
  getItem,
  getRange,
  getMapDataListVer,
  getStageList,
  getFurn,
  getCharItem,
};
