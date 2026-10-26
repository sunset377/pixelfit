(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),t.credentials=e.crossOrigin===`use-credentials`?`include`:e.crossOrigin===`anonymous`?`omit`:`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();var e=class{context=null;master=null;noiseBuffer=null;enabled=!0;constructor(e=!0){this.enabled=e}setEnabled(e){this.enabled=e,this.master&&this.context&&this.master.gain.setTargetAtTime(e?.55:1e-4,this.context.currentTime,.02),e&&this.unlock()}isEnabled(){return this.enabled}async unlock(){let e=this.ensureContext();if(e)try{e.state===`suspended`&&await e.resume()}catch{}}ensureContext(){if(typeof window>`u`)return null;if(this.context)return this.context;let e=window.AudioContext??window.webkitAudioContext;if(!e)return null;try{let t=new e,n=t.createDynamicsCompressor();n.threshold.setValueAtTime(-18,t.currentTime),n.knee.setValueAtTime(16,t.currentTime),n.ratio.setValueAtTime(8,t.currentTime);let r=t.createGain();return r.gain.value=this.enabled?.55:1e-4,r.connect(n),n.connect(t.destination),this.context=t,this.master=r,this.noiseBuffer=this.buildNoiseBuffer(t),t}catch{return null}}buildNoiseBuffer(e){let t=Math.floor(e.sampleRate*.35),n=e.createBuffer(1,t,e.sampleRate),r=n.getChannelData(0);for(let e=0;e<t;e+=1)r[e]=Math.random()*2-1;return n}ready(){if(!this.enabled)return null;let e=this.ensureContext();return!e||!this.master?null:(e.state===`suspended`&&e.resume(),{context:e,master:this.master})}tone(e,t,n={}){let r=this.ready();if(!r)return;let{context:i,master:a}=r,o=i.currentTime+(n.delay??0),s=i.createOscillator(),c=i.createGain();s.type=n.type??`square`,s.frequency.setValueAtTime(Math.max(30,e),o),n.slideTo&&s.frequency.exponentialRampToValueAtTime(Math.max(30,n.slideTo),o+t),n.detune&&s.detune.setValueAtTime(n.detune,o);let l=Math.max(1e-4,n.gain??.08),u=Math.max(.001,n.attack??.005);c.gain.setValueAtTime(1e-4,o),c.gain.exponentialRampToValueAtTime(l,o+u),c.gain.exponentialRampToValueAtTime(1e-4,o+t),s.connect(c),c.connect(a),s.start(o),s.stop(o+t+.03)}noise(e,t={}){let n=this.ready();if(!n||!this.noiseBuffer)return;let{context:r,master:i}=n,a=r.currentTime+(t.delay??0),o=r.createBufferSource();o.buffer=this.noiseBuffer;let s=r.createBiquadFilter();s.type=`bandpass`,s.frequency.setValueAtTime((t.highpass??400)+500,a),s.Q.setValueAtTime(.7,a),t.highpass&&(s.frequency.setValueAtTime(t.highpass,a),s.frequency.exponentialRampToValueAtTime(Math.max(80,t.lowpass??t.highpass*.45),a+e));let c=r.createGain(),l=Math.max(1e-4,t.gain??.16);c.gain.setValueAtTime(1e-4,a),c.gain.exponentialRampToValueAtTime(l,a+.008),c.gain.exponentialRampToValueAtTime(1e-4,a+e),o.connect(s),s.connect(c),c.connect(i),o.start(a),o.stop(a+e+.03)}tap(){this.tone(680,.035,{type:`triangle`,gain:.035})}punch(e){let t=Math.min(240,e*8);this.noise(.085,{gain:.1,highpass:900+t,lowpass:220}),this.tone(150+t*.35,.095,{type:`sine`,gain:.16,slideTo:52+t*.3}),this.tone(420+t,.035,{type:`square`,gain:.025,delay:.004})}comboMilestone(){[523.25,659.25,783.99].forEach((e,t)=>{this.tone(e,.14,{type:`triangle`,gain:.075,delay:t*.055})})}countdown(e){this.tone(e?880:520,e?.28:.1,{type:e?`sawtooth`:`square`,gain:e?.07:.055,slideTo:e?1320:void 0})}startWhistle(){this.noise(.28,{gain:.055,highpass:1400,lowpass:2600}),this.tone(620,.22,{type:`sawtooth`,gain:.055,slideTo:990}),this.tone(310,.18,{type:`square`,gain:.035,slideTo:440,delay:.02})}finisher(){this.noise(.5,{gain:.22,highpass:180,lowpass:70}),this.tone(120,.5,{type:`sine`,gain:.22,slideTo:38}),this.tone(880,.16,{type:`sawtooth`,gain:.06,delay:.03,slideTo:220}),this.noise(.2,{gain:.08,highpass:2600,lowpass:900,delay:.06})}victory(){[392,523.25,659.25,783.99,1046.5].forEach((e,t)=>{this.tone(e,.32,{type:t>2?`triangle`:`square`,gain:.055,delay:t*.09})}),this.noise(.16,{gain:.04,highpass:3600,lowpass:1800,delay:.3})}coin(){this.tone(1046.5,.08,{type:`triangle`,gain:.06}),this.tone(1568,.12,{type:`triangle`,gain:.045,delay:.055})}reward(){this.coin(),window.setTimeout(()=>this.coin(),110)}levelUp(){[523.25,659.25,783.99,1046.5,1318.5].forEach((e,t)=>{this.tone(e,.32,{type:`triangle`,gain:.08,delay:t*.075})}),window.setTimeout(()=>this.noise(.4,{gain:.045,highpass:2400,lowpass:900}),260)}error(){this.tone(180,.12,{type:`square`,gain:.045,slideTo:110})}pick(){this.tone(520,.05,{type:`triangle`,gain:.04,slideTo:760}),this.noise(.035,{gain:.028,highpass:2100,lowpass:3400})}drop(){this.tone(240,.09,{type:`sine`,gain:.09,slideTo:150}),this.noise(.05,{gain:.05,highpass:700,lowpass:300})}clear(){[659.25,880,1174.66].forEach((e,t)=>{this.tone(e,.16,{type:`triangle`,gain:.075,delay:t*.055})}),this.noise(.18,{gain:.05,highpass:3e3,lowpass:1600,delay:.03})}trayWarn(){this.tone(220,.1,{type:`square`,gain:.05}),this.tone(180,.14,{type:`square`,gain:.048,delay:.12})}tick(){this.tone(1200,.03,{type:`square`,gain:.03})}booster(){this.noise(.34,{gain:.1,highpass:2600,lowpass:420}),this.tone(300,.28,{type:`sawtooth`,gain:.045,slideTo:900})}shuffle(){this.noise(.42,{gain:.075,highpass:1600,lowpass:380})}reject(){this.tone(330,.1,{type:`triangle`,gain:.05,slideTo:220}),this.tone(247,.14,{type:`triangle`,gain:.045,delay:.08,slideTo:165})}fail(){[392,311.13,233.08].forEach((e,t)=>{this.tone(e,.34,{type:`sawtooth`,gain:.06,delay:t*.13})}),this.tone(98,.5,{type:`sine`,gain:.1,delay:.3,slideTo:55})}streak(e){let t=523.25*1.0595**Math.min(12,Math.max(0,e)*2);this.tone(t,.12,{type:`triangle`,gain:.07}),this.tone(t*1.5,.16,{type:`triangle`,gain:.055,delay:.06})}},t={ali:`original-ali-v3`,you:`original-you-v3`,tie:`original-tie-v3`,ran:`original-ran-v3`},n={schemaVersion:1,storageKey:`pixelfit.save`,versionLabel:`v0.2 · V2 原型`,level:{max:99,baseXp:100,growth:60},training:{durationMs:2e4,countdownMs:3e3,comboWindowMs:820,staminaCost:1,milestoneStep:10,rewards:{baseXp:38,xpPerHit:.65,xpPerCombo:.8,baseCoins:26,coinsPerHit:.38,coinsPerCombo:.52,dailyFirstXp:8,dailyFirstCoins:18}},stamina:{max:6,start:6,regenMs:18e4,adRefill:3},ad:{durationMs:5e3,multiplier:2},diet:{durationMs:9e4,countdownMs:3e3,staminaCost:1,pouchSlots:24,foodIds:[`potato`,`chicken-breast`,`broccoli`],traySlots:7,clearThreshold:3,trayWarnAt:2,tickBelowMs:1e4,targetHits:10,comboWindowMs:2400,boosters:{freePerRound:1,coinCost:30},rewards:{baseXp:34,xpPerItem:2.2,xpPerCombo:1.6,baseCoins:24,coinsPerItem:1.5,coinsPerCombo:1.1,dailyFirstXp:8,dailyFirstCoins:18}},conveyor:{durationMs:9e4,countdownMs:3e3,staminaCost:1,itemIntervalMs:2200,itemTravelMs:9e3,comboWindowMs:2400,rewards:{baseXp:40,xpPerItem:2.6,xpPerCombo:1.8,baseCoins:28,coinsPerItem:1.8,coinsPerCombo:1.2,dailyFirstXp:8,dailyFirstCoins:18}},sleep:{adHours:2,coinPerPoint:16,ringTickMs:250},startingCoins:128,workoutHistoryLimit:12,share:{width:1080,height:1440,hashtags:`#PIXELFIT #今日份变强`,captionTemplate:`我在 PixelFit 完成了 {hits} 次热身出拳，最高 {combo} 连击。一起留住今天的进步！
{hashtags}`,captionByMode:{boxing:`我在 PixelFit 完成了 {hits} 次热身出拳，最高 {combo} 连击。一起留住今天的进步！
{hashtags}`,diet:`我在 PixelFit 消除了 {hits} 套同类营养食材，最高 {combo} 连对。边玩边认识食物 🥦
{hashtags}`,conveyor:`我在 PixelFit 挑对了 {hits} 件器械，最高 {combo} 连对！今天的铁没白举 🏋️
{hashtags}`}},reservedEntries:[{id:`wardrobe`,label:`衣柜`,icon:`hanger`,note:`新皮肤正在熨烫中`},{id:`shop`,label:`商城`,icon:`bag`,note:`补给和好看的行头都在路上`},{id:`tasks`,label:`任务`,icon:`task`,note:`每日任务正在排班`},{id:`archive`,label:`档案`,icon:`file`,note:`成长档案还在装订`}]},r=[{id:`ali`,name:`阿力`,en:`ALI`,gender:`男`,epithet:`热血拳手`,quote:`一拳下去，烦恼清零。`,gymLine:[`今天也要把烦恼打飞。`,`拳套已戴好，开练？`,`别看了，脂肪在偷笑。`],look:{skin:`#F0B486`,skinShade:`#D98E66`,hair:`#2A1B3D`,hairShade:`#3A2A50`,top:`#D7FF3F`,topShade:`#A7CF1F`,bottom:`#27334E`,shoes:`#FF5C7A`,accent:`#FF5C7A`,hairStyle:`crop`,build:`hero`,accessory:`headband`}},{id:`you`,name:`小柚`,en:`YOU`,gender:`女`,epithet:`元气搭子`,quote:`今天也要甜着练。`,gymLine:[`柚子味的多巴胺，要不要？`,`练完这组，奖励自己一瓶汽水。`,`先笑一个，再出拳。`],look:{skin:`#FFD2B3`,skinShade:`#EEB18E`,hair:`#FF7B54`,hairShade:`#D95C3E`,top:`#74E8F2`,topShade:`#3FBDD0`,bottom:`#3B2A63`,shoes:`#D7FF3F`,accent:`#D7FF3F`,hairStyle:`bob`,build:`athlete`,accessory:`starclip`}},{id:`tie`,name:`铁子`,en:`TIE`,gender:`男`,epithet:`硬核老铁`,quote:`别问，问就是加片。`,gymLine:[`裤腰带紧了？那是要变强了。`,`今天不练腿，明天怎么追公交。`,`老铁，匀速出拳，稳。`],look:{skin:`#D99A68`,skinShade:`#B97B4E`,hair:`#1D142B`,hairShade:`#2F2340`,top:`#A58BFF`,topShade:`#7D63D6`,bottom:`#2C2946`,shoes:`#F2C94C`,accent:`#F2C94C`,hairStyle:`beanie`,build:`bruiser`,beard:!0,accessory:`chain`}},{id:`ran`,name:`燃燃`,en:`RAN`,gender:`女`,epithet:`夜跑辣妹`,quote:`汗，是今晚的腮红。`,gymLine:[`夜色刚好，出拳也刚好。`,`燃一点，再燃一点。`,`今天的心率，有点上头。`],look:{skin:`#F4B79A`,skinShade:`#D99478`,hair:`#2DE2E6`,hairShade:`#16A7B5`,top:`#FF5C7A`,topShade:`#D63D5C`,bottom:`#241C3B`,shoes:`#FFF6E4`,accent:`#FFF6E4`,hairStyle:`twintail`,build:`athlete`,accessory:`earring`}}],i=[{id:`bulk`,name:`增肌局`,en:`BULK MODE`,tagline:`把每一次心跳，练成铠甲。`,detail:`吃得香，练得狠，练成更壮一点的自己。`,bonusLabel:`训练 XP +12%`,xpMultiplier:1.12,coinMultiplier:1,accent:`#FF5C7A`,cardTitle:[`铁没白撸`,`人又变强`],cardQuote:`每一拳，都算在明天的铠甲上。`,shareLine:`今日增肌局完成，离猛男/猛女又近一步。`},{id:`cut`,name:`减脂局`,en:`CUT MODE`,tagline:`每一滴汗，都算数。`,detail:`轻一点，快一点，和囤了一整年的脂肪正面开打。`,bonusLabel:`金币收益 +12%`,xpMultiplier:1,coinMultiplier:1.12,accent:`#D7FF3F`,cardTitle:[`汗没白流`,`脂肪在逃`],cardQuote:`把今天的不爽，连着脂肪一起打飞。`,shareLine:`今日减脂局完成，脂肪正在连夜跑路。`}],a=Object.fromEntries(r.map(e=>[e.id,e])),o=Object.fromEntries(i.map(e=>[e.id,e])),s=[`铁憨憨`,`熬夜举铁侠`,`多巴胺打工人`,`深蹲小王子`,`躺平未遂`,`八块腹肌预备役`,`奶茶续命选手`,`自律小鼠`,`今晚不加班`,`脂肪克星本星`,`不想跑步的鱼`,`快乐干饭人`,`一拳一个小目标`,`赛博健身房常客`],c=[`砰！`,`KO!`,`脂肪退散`,`多巴胺 +1`,`再来！`,`狠一点`,`漂亮！`,`爽！`,`嘿！`,`哈！`],l=[`手感来了`,`燃起来了`,`多巴胺爆表`,`脂肪开始慌了`,`这拳有点东西`,`自律加载中`],u=[`手感不错，再练一把？`,`今天的铁，在等你。`,`汗不会骗人，你也不会。`,`别摸了，出拳。`,`脂肪怪已经热身完了。`],d={morning:[`早，今天也来一拳？`,`晨练的人，运气不会太差。`,`早上好，先把身体叫醒。`],afternoon:[`下午三点，适合出拳。`,`摸鱼时间到了，来打两拳？`,`困了吗？脂肪怪比你还困。`],evening:[`晚上好，今天练了吗？`,`夜练，是成年人的短暂逃离。`,`一天结束前，把自己练开心。`]},f={wardrobe:{title:`衣橱还在熨衣服`,body:`新皮肤、新拳套、新发型正在赶工。先把今天的训练打完，开业时给你留一件。`},shop:{title:`商城还在补货`,body:`能量饮料、像素蛋白粉、联名运动服都在路上。放心，不花钱也能玩完全部内容。`},tasks:{title:`任务正在排班`,body:`每日任务、周挑战和隐藏成就很快就会来。今天先完成最朴素的一条：练一次。`},archive:{title:`档案还在装订`,body:`这里以后会收着你的每一次出拳、每一张打卡卡和每一点看得见的变强。`}},p={carb:{id:`carb`,label:`碳水化合物`,glyph:`🍚`,hint:`主食和糖原`,accent:`#d7ff3f`},protein:{id:`protein`,label:`蛋白质`,glyph:`🥩`,hint:`肌肉修复原料`,accent:`#ff6b6b`},fiber:{id:`fiber`,label:`膳食纤维`,glyph:`🥦`,hint:`肠道和饱腹感`,accent:`#5ee6c0`}},m={chest:{id:`chest`,label:`胸部`,glyph:`🫁`,hint:`推类动作`,accent:`#ff6b6b`},back:{id:`back`,label:`背部`,glyph:`🪝`,hint:`拉类动作`,accent:`#5ee6c0`},shoulder:{id:`shoulder`,label:`肩部`,glyph:`🪖`,hint:`推举与平举`,accent:`#ffd166`},abs:{id:`abs`,label:`腹部`,glyph:`🧱`,hint:`核心稳定`,accent:`#c792ea`},leg:{id:`leg`,label:`腿部`,glyph:`🦵`,hint:`蹲与蹬`,accent:`#d7ff3f`}},h=[{id:`rice`,name:`米饭`,glyph:`🍚`,categories:[`carb`],science:`米饭是精细碳水，训练前补充糖原是主力，但它几乎不含膳食纤维。`},{id:`noodles`,name:`面条`,glyph:`🍜`,categories:[`carb`],science:`面条的主体是淀粉，属于碳水化合物，蛋白质含量很低。`},{id:`bread`,name:`面包`,glyph:`🍞`,categories:[`carb`],science:`面包是碳水主食，全麦款才顺带一点膳食纤维，白面包基本没有。`},{id:`potato`,name:`土豆`,glyph:`🥔`,categories:[`carb`],science:`土豆主要提供淀粉，属于碳水化合物来源，可作为主食的一部分。碳水为日常活动和运动供能，也帮助补充肌糖原。它同时含少量蛋白质、纤维等营养，并不是只含碳水。`},{id:`sweet-potato`,name:`红薯`,glyph:`🍠`,categories:[`carb`,`fiber`],science:`红薯是复合碳水，同时带不少膳食纤维，训练前吃很稳。`},{id:`oats`,name:`燕麦`,glyph:`🥣`,categories:[`carb`,`fiber`],science:`燕麦是慢碳代表，β-葡聚糖让它同时算膳食纤维来源。`},{id:`corn`,name:`玉米`,glyph:`🌽`,categories:[`carb`,`fiber`],science:`玉米主要提供碳水，同时带一部分膳食纤维，两类都沾。`},{id:`banana`,name:`香蕉`,glyph:`🍌`,categories:[`carb`,`fiber`],science:`香蕉是运动前后最快的碳水补给，果胶也让它算一点膳食纤维。`},{id:`apple`,name:`苹果`,glyph:`🍎`,categories:[`carb`,`fiber`],science:`苹果以果糖为主，果胶让它同时是膳食纤维来源。`},{id:`chicken-breast`,name:`鸡胸肉`,glyph:`🍗`,categories:[`protein`],science:`鸡胸肉是常见的优质蛋白质来源。蛋白质参与肌肉组织的修复和维持；也要搭配适量主食、蔬菜和休息。吃某一种食物不会自动长肌肉。`},{id:`chicken-leg`,name:`鸡腿`,glyph:`🍖`,categories:[`protein`],science:`鸡腿比鸡胸多一点脂肪，但蛋白质依然充足，属于优质蛋白来源。`},{id:`beef`,name:`牛肉`,glyph:`🥩`,categories:[`protein`],science:`牛肉富含蛋白质和天然肌酸，红肉里的铁对耐力也有帮助。`},{id:`egg`,name:`鸡蛋`,glyph:`🥚`,categories:[`protein`],science:`鸡蛋是蛋白质的黄金标准，氨基酸谱几乎完美，蛋黄别丢。`},{id:`whey`,name:`蛋白粉`,glyph:`🥛`,categories:[`protein`],science:`蛋白粉就是提纯的乳清蛋白，训练后半小时内补一份最省事。`},{id:`salmon`,name:`三文鱼`,glyph:`🐟`,categories:[`protein`],science:`三文鱼是优质蛋白加 Omega-3，既帮肌肉恢复也护关节。`},{id:`shrimp`,name:`虾`,glyph:`🍤`,categories:[`protein`],science:`虾几乎纯蛋白，脂肪极低，是减脂期的高蛋白主力。`},{id:`tofu`,name:`豆腐`,glyph:`🧊`,categories:[`protein`],science:`豆腐是植物蛋白代表，含大豆异黄酮，素食增肌的常用选择。`},{id:`milk`,name:`牛奶`,glyph:`🥛`,categories:[`protein`],science:`牛奶含乳糖，但它的核心价值是乳清加酪蛋白，按蛋白质算。`},{id:`broccoli`,name:`西兰花`,glyph:`🥦`,categories:[`fiber`],science:`西兰花能提供膳食纤维和多种维生素。膳食纤维有助于正常肠道功能；健身饮食也要搭配主食和蛋白质来源。游戏按主要学习类别归类，并非只含这一种营养。`},{id:`kale`,name:`羽衣甘蓝`,glyph:`🥬`,categories:[`fiber`],science:`羽衣甘蓝纤维密度极高，是健身餐里的绿色担当。`},{id:`spinach`,name:`菠菜`,glyph:`🌿`,categories:[`fiber`],science:`菠菜富含膳食纤维和镁，镁参与肌肉收缩，它不是补铁神器。`},{id:`carrot`,name:`胡萝卜`,glyph:`🥕`,categories:[`fiber`],science:`胡萝卜的纤维和 β-胡萝卜素都不少，但它不是主食。`}],g=[{id:`seated-chest-press`,name:`坐姿推胸`,glyph:`🛠️`,muscles:[`chest`],science:`坐姿推胸固定轨迹推胸大肌，新手最容易找到胸部发力。`},{id:`dumbbell-bench`,name:`哑铃卧推`,glyph:`🏋️`,muscles:[`chest`],science:`哑铃卧推活动范围比杠铃大，胸大肌中缝和稳定肌一起练。`},{id:`barbell-bench`,name:`杠铃卧推`,glyph:`🏋️‍♂️`,muscles:[`chest`],science:`杠铃卧推是胸部力量的核心动作，能上大重量。`},{id:`pec-deck`,name:`蝴蝶机夹胸`,glyph:`🦋`,muscles:[`chest`],science:`蝴蝶机夹胸是孤立动作，专门挤压胸大肌内侧。`},{id:`pushup`,name:`俯卧撑`,glyph:`🙌`,muscles:[`chest`],science:`俯卧撑是自重推类动作，主要刺激胸大肌和三角肌前束。`},{id:`lat-pulldown`,name:`高位下拉`,glyph:`🪜`,muscles:[`back`],science:`高位下拉主要练背阔肌，是打造背部宽度的核心动作。`},{id:`seated-row`,name:`坐姿划船`,glyph:`🚣`,muscles:[`back`],science:`坐姿划船练背阔肌和菱形肌，负责背部厚度。`},{id:`pullup`,name:`引体向上`,glyph:`🧗`,muscles:[`back`],science:`引体向上是背阔肌的自重之王，能做起来说明背部力量到位。`},{id:`barbell-row`,name:`杠铃划船`,glyph:`⚓`,muscles:[`back`],science:`杠铃划船练中背厚度，背阔肌和斜方肌中下束一起参与。`},{id:`deadlift`,name:`硬拉`,glyph:`🪨`,muscles:[`back`,`leg`],science:`硬拉是全身动作，主要练竖脊肌和臀腿后链，背和腿都算。`},{id:`lateral-raise`,name:`侧平举`,glyph:`🕊️`,muscles:[`shoulder`],science:`侧平举针对三角肌中束，练的是肩膀的宽度。`},{id:`dumbbell-press`,name:`哑铃推举`,glyph:`🏋️`,muscles:[`shoulder`],science:`哑铃推举主攻三角肌前束和中束，是肩部推类主力。`},{id:`overhead-press`,name:`杠铃推举`,glyph:`⬆️`,muscles:[`shoulder`],science:`杠铃推举练三角肌整体，同时很考验核心稳定。`},{id:`face-pull`,name:`面拉`,glyph:`🪢`,muscles:[`shoulder`],science:`面拉练三角肌后束和肩袖，是改善圆肩的经典动作。`},{id:`ab-crunch-machine`,name:`卷腹机`,glyph:`🌀`,muscles:[`abs`],science:`卷腹机固定骨盆，让腹直肌在可控行程里收缩。`},{id:`hanging-leg-raise`,name:`悬垂举腿`,glyph:`🎏`,muscles:[`abs`],science:`悬垂举腿主攻腹直肌下部，同时很考验握力。`},{id:`plank`,name:`平板支撑`,glyph:`🧱`,muscles:[`abs`],science:`平板支撑是等长收缩，练腹横肌和整体核心稳定。`},{id:`russian-twist`,name:`俄罗斯转体`,glyph:`🔁`,muscles:[`abs`],science:`俄罗斯转体练腹斜肌，负责躯干旋转。`},{id:`leg-press`,name:`腿举`,glyph:`🦵`,muscles:[`leg`],science:`腿举用固定轨迹推大重量，主要刺激股四头肌。`},{id:`squat-rack`,name:`深蹲架`,glyph:`🏗️`,muscles:[`leg`],science:`深蹲架做深蹲，股四头肌和臀大肌一起发力，是腿部之王。`},{id:`leg-extension`,name:`腿屈伸`,glyph:`📐`,muscles:[`leg`],science:`腿屈伸孤立股四头肌，适合放在训练最后练到力竭。`},{id:`leg-curl`,name:`腿弯举`,glyph:`🪃`,muscles:[`leg`],science:`腿弯举练大腿后侧的腘绳肌，平衡股四头肌避免膝盖失衡。`}];function _(e){return e.replaceAll(`&`,`&amp;`).replaceAll(`<`,`&lt;`).replaceAll(`>`,`&gt;`).replaceAll(`"`,`&quot;`).replaceAll(`'`,`&#039;`)}function v(e,t,n){return Math.min(n,Math.max(t,e))}function y(e){let t=e[Math.floor(Math.random()*e.length)];if(t===void 0)throw Error(`Cannot pick from an empty list`);return t}function b(e,t){return Math.floor(Math.random()*(t-e+1))+e}function x(e){return Math.round(e).toLocaleString(`zh-CN`)}function S(e){return String(e).padStart(2,`0`)}function C(e){let t=Math.max(0,Math.ceil(e/1e3)),n=Math.floor(t/60),r=t%60;return`${S(n)}:${S(r)}`}function w(e){return(Math.max(0,e)/1e3).toFixed(1)}function T(e){return`${e.getFullYear()}-${S(e.getMonth()+1)}-${S(e.getDate())}`}function E(e=Date.now()){return T(new Date(e))}function D(e=Date.now()){let t=new Date(e);return`${t.getFullYear()}.${S(t.getMonth()+1)}.${S(t.getDate())}`}function O(e){return e>=5&&e<12?`morning`:e>=12&&e<18?`afternoon`:`evening`}function k(e=``){let t=typeof crypto<`u`&&typeof crypto.randomUUID==`function`?crypto.randomUUID():`${Date.now().toString(36)}-${Math.random().toString(36).slice(2,10)}`;return e?`${e}_${t}`:t}async function A(e){try{if(navigator.clipboard&&window.isSecureContext)return await navigator.clipboard.writeText(e),!0}catch{}try{let t=document.createElement(`textarea`);t.value=e,t.setAttribute(`readonly`,`true`),t.style.position=`fixed`,t.style.opacity=`0`,document.body.appendChild(t),t.select();let n=document.execCommand(`copy`);return t.remove(),n}catch{return!1}}function ee(e,t){return t[e%t.length]??t[0]??``}function te(e){try{navigator.vibrate?.(e)}catch{}}var ne=1,j=null;function re(e=Date.now()){return{schemaVersion:n.schemaVersion,userId:k(`guest`),profile:null,progress:{level:ne,xp:0,coins:n.startingCoins,stamina:n.stamina.start,staminaUpdatedAt:e},stats:{totalWorkouts:0,totalHits:0,bestCombo:0,totalCoins:0,totalXp:0,streakDays:0,lastWorkoutDate:null},workouts:[],settings:{sound:!0},createdAt:e,updatedAt:e}}function M(e){return typeof e==`object`&&!!e}function N(e,t=``){return typeof e==`string`?e:t}function P(e,t){return typeof e==`number`&&Number.isFinite(e)?e:t}function F(e,t,n,r){return v(Math.round(P(e,t)),n,r)}function I(e){if(!M(e))return null;let t=N(e.nickname).trim().slice(0,12),n=N(e.characterId),r=N(e.route);return!t||!(n in a)||!(r in o)?null:{nickname:t,characterId:n,route:r,createdAt:P(e.createdAt,Date.now())}}function ie(e){if(!M(e))return null;let t=N(e.characterId),r=N(e.route),i=P(e.completedAt,0),s=e.mode,c=s===`boxing`||s===`diet`||s===`conveyor`?s:void 0;return!(t in a)||!(r in o)||!i?null:{id:N(e.id,k(`workout`)),completedAt:i,dayKey:N(e.dayKey,E(i)),nickname:N(e.nickname,`健身搭子`).slice(0,12),characterId:t,route:r,...c===void 0?{}:{mode:c},level:F(e.level,1,1,n.level.max),hits:F(e.hits,0,0,9999),maxCombo:F(e.maxCombo,0,0,9999),durationSec:F(e.durationSec,20,1,3600),xp:F(e.xp,0,0,999999),coins:F(e.coins,0,0,999999),doubled:e.doubled===!0,dailyBonus:e.dailyBonus===!0,milestones:F(e.milestones,0,0,9999)}}function L(e,t){let r=re(t);if(!e)return r;let i=e,a=M(i.progress)?i.progress:{},o=M(i.stats)?i.stats:{},s=M(i.settings)?i.settings:{},c=(Array.isArray(i.workouts)?i.workouts:[]).map(ie).filter(e=>e!==null).sort((e,t)=>t.completedAt-e.completedAt).slice(0,n.workoutHistoryLimit);return{schemaVersion:n.schemaVersion,userId:N(i.userId)||r.userId,profile:I(i.profile),progress:{level:F(a.level,r.progress.level,1,n.level.max),xp:Math.max(0,Math.round(P(a.xp,0))),coins:Math.max(0,Math.round(P(a.coins,r.progress.coins))),stamina:F(a.stamina,r.progress.stamina,0,n.stamina.max),staminaUpdatedAt:P(a.staminaUpdatedAt,t)},stats:{totalWorkouts:Math.max(0,F(o.totalWorkouts,0,0,9999999)),totalHits:Math.max(0,F(o.totalHits,0,0,99999999)),bestCombo:Math.max(0,F(o.bestCombo,0,0,99999)),totalCoins:Math.max(0,F(o.totalCoins,0,0,99999999)),totalXp:Math.max(0,F(o.totalXp,0,0,99999999)),streakDays:Math.max(0,F(o.streakDays,0,0,99999)),lastWorkoutDate:typeof o.lastWorkoutDate==`string`?o.lastWorkoutDate:null},workouts:c,settings:{sound:s.sound!==!1},createdAt:P(i.createdAt,t),updatedAt:t}}function ae(e){try{return window.localStorage.getItem(e)}catch{return j}}function oe(e,t){try{window.localStorage.setItem(e,t),j=t}catch{j=t,console.warn(`[PixelFit] localStorage unavailable; using in-memory save for this tab.`)}}function se(e=Date.now()){let t=n.storageKey,r=ae(t);if(!r){let t=re(e);return R(t,e),t}try{let t=L(JSON.parse(r),e);return V(t,e)&&R(t,e),t}catch(n){console.warn(`[PixelFit] Save file was corrupted; starting a fresh guest profile.`,n);try{window.localStorage.setItem(`${t}.corrupt`,r)}catch{}let i=re(e);return R(i,e),i}}function R(e,t=Date.now()){e.updatedAt=t,e.schemaVersion=n.schemaVersion;try{oe(n.storageKey,JSON.stringify(e))}catch(e){console.warn(`[PixelFit] Could not serialize save.`,e)}}function z(e){let t=v(Math.round(e),1,n.level.max);return n.level.baseXp+(t-1)*n.level.growth}function B(e,t,r){let i=v(Math.round(e),1,n.level.max),a=Math.max(0,t+Math.max(0,Math.round(r))),o=0;for(;i<n.level.max&&a>=z(i);)a-=z(i),i+=1,o+=1;return i>=n.level.max&&(a=Math.min(a,z(n.level.max))),{level:i,xp:a,levelsGained:o}}function V(e,t=Date.now()){let{progress:r}=e;if(r.stamina>=n.stamina.max)return!1;let i=r.staminaUpdatedAt;if(!Number.isFinite(i)||i>t)return i=t,r.staminaUpdatedAt=i,!0;let a=t-i;if(a<n.stamina.regenMs)return!1;let o=Math.floor(a/n.stamina.regenMs),s=Math.min(n.stamina.max,r.stamina+o);return r.stamina=s,r.staminaUpdatedAt=s>=n.stamina.max?t:t-a%n.stamina.regenMs,!0}function ce(e,t,r=Date.now()){V(e,r);let i=e.progress.stamina;return e.progress.stamina=v(i+Math.max(0,Math.round(t)),0,n.stamina.max),i>=n.stamina.max&&(e.progress.staminaUpdatedAt=r),e.progress.stamina-i}function H(e,t,n=Date.now()){return V(e,n),e.progress.stamina<t?!1:(e.progress.stamina-=t,e.progress.staminaUpdatedAt=n,!0)}function U(e,t=Date.now()){if(e.progress.stamina>=n.stamina.max)return{full:!0,nextInMs:0,nextAt:null};let r=e.progress.staminaUpdatedAt+n.stamina.regenMs;return{full:!1,nextInMs:Math.max(0,r-t),nextAt:r}}function le(e,t=Date.now()){return e.stats.lastWorkoutDate!==E(t)}function ue(e,t){e.workouts=[t,...e.workouts].slice(0,n.workoutHistoryLimit)}function W(e,t=Date.now()){let n=E(t);if(e.stats.lastWorkoutDate===n)return e.stats.streakDays;let r=new Date(t);r.setDate(r.getDate()-1);let i=E(r.getTime());return e.stats.streakDays=e.stats.lastWorkoutDate===i?Math.max(1,e.stats.streakDays+1):1,e.stats.lastWorkoutDate=n,e.stats.streakDays}function G(e){if(e===`diet`){let e=n.diet.rewards;return{baseXp:e.baseXp,perHitXp:e.xpPerItem,perComboXp:e.xpPerCombo,baseCoins:e.baseCoins,perHitCoins:e.coinsPerItem,perComboCoins:e.coinsPerCombo,dailyFirstXp:e.dailyFirstXp,dailyFirstCoins:e.dailyFirstCoins}}if(e===`conveyor`){let e=n.conveyor.rewards;return{baseXp:e.baseXp,perHitXp:e.xpPerItem,perComboXp:e.xpPerCombo,baseCoins:e.baseCoins,perHitCoins:e.coinsPerItem,perComboCoins:e.coinsPerCombo,dailyFirstXp:e.dailyFirstXp,dailyFirstCoins:e.dailyFirstCoins}}let t=n.training.rewards;return{baseXp:t.baseXp,perHitXp:t.xpPerHit,perComboXp:t.xpPerCombo,baseCoins:t.baseCoins,perHitCoins:t.coinsPerHit,perComboCoins:t.coinsPerCombo,dailyFirstXp:t.dailyFirstXp,dailyFirstCoins:t.dailyFirstCoins}}function K(e){return e===`diet`?n.diet.staminaCost:e===`conveyor`?n.conveyor.staminaCost:n.training.staminaCost}function q(e,t,n=1,r=Date.now()){let i=e.profile?o[e.profile.route]:o.bulk,a=G(t.mode),s=Math.max(1,Math.round(n)),c=le(e,r),l=Math.round(a.baseXp+t.hits*a.perHitXp+t.maxCombo*a.perComboXp+t.milestones*2),u=Math.round(a.baseCoins+t.hits*a.perHitCoins+t.maxCombo*a.perComboCoins+t.milestones),d=Math.round(l*i.xpMultiplier),f=Math.round(u*i.coinMultiplier),p=c?a.dailyFirstXp:0,m=c?a.dailyFirstCoins:0;return{baseXp:l,baseCoins:u,routeBonusXp:d-l,routeBonusCoins:f-u,dailyBonusXp:p,dailyBonusCoins:m,xp:(d+p)*s,coins:(f+m)*s,multiplier:s,levelBefore:e.progress.level,xpBefore:e.progress.xp,nextLevelXp:z(e.progress.level)}}function J(e,t,n=1,r=Date.now()){if(!e.profile||!H(e,K(t.mode),r))return null;let i=q(e,t,n,r),a=e.progress.level,o=B(e.progress.level,e.progress.xp,i.xp);e.progress.level=o.level,e.progress.xp=o.xp,e.progress.coins+=i.coins,e.stats.totalWorkouts+=1,e.stats.totalHits+=t.hits,e.stats.bestCombo=Math.max(e.stats.bestCombo,t.maxCombo),e.stats.totalCoins+=i.coins,e.stats.totalXp+=i.xp,W(e,r);let s={id:k(`workout`),completedAt:r,dayKey:E(r),nickname:e.profile.nickname,characterId:e.profile.characterId,route:e.profile.route,mode:t.mode,level:e.progress.level,hits:t.hits,maxCombo:t.maxCombo,durationSec:t.durationSec,xp:i.xp,coins:i.coins,doubled:i.multiplier>1,dailyBonus:i.dailyBonusCoins>0||i.dailyBonusXp>0,milestones:t.milestones};return ue(e,s),{record:s,xp:i.xp,coins:i.coins,doubled:i.multiplier>1,levelBefore:a,levelAfter:e.progress.level,leveledUp:o.levelsGained>0,levelsGained:o.levelsGained}}function Y(e){return(n.share.captionByMode[e.mode??`boxing`]??n.share.captionTemplate).replaceAll(`{hits}`,String(e.hits)).replaceAll(`{combo}`,String(e.maxCombo)).replaceAll(`{nickname}`,e.nickname).replaceAll(`{level}`,String(e.level)).replaceAll(`{route}`,o[e.route].name).replaceAll(`{hashtags}`,n.share.hashtags)}var de={coin:`<circle cx="12" cy="12" r="8.5"/><path d="M12 7.5v9M9.3 9.6c.4-1 1.4-1.6 2.8-1.6 1.7 0 2.8.8 2.8 2.1 0 2.8-5.7 1.4-5.7 4.2 0 1.2 1.1 2 2.9 2 1.4 0 2.4-.6 2.9-1.6"/>`,bolt:`<path d="M13.2 2.8 5 13.3h5.5L9.8 21.2 18.9 9.9h-5.6l-.1-7.1Z" fill="currentColor" stroke="none"/>`,dumbbell:`<path d="M2 9v6M5 7.5v9M19 7.5v9M22 9v6M8 12h8M7.5 8v8M16.5 8v8"/>`,sound:`<path d="M4 9.5h3.2L12 5.5v13L7.2 14.5H4v-5Z"/><path d="M15.5 9.2c1.4 1.4 1.4 4.2 0 5.6M18.3 7c2.8 2.8 2.8 7.2 0 10"/>`,mute:`<path d="M4 9.5h3.2L12 5.5v13L7.2 14.5H4v-5Z"/><path d="m16 9.5 5 5M21 9.5l-5 5"/>`,hanger:`<path d="M9.7 6.1a2.3 2.3 0 1 1 3.3 2.1c-.9.4-1.2 1-1.2 2.1L20 16.5a1.2 1.2 0 0 1-.8 2H4.8a1.2 1.2 0 0 1-.8-2L12 10.3"/>`,bag:`<path d="M5 8h14l1 12H4L5 8Z"/><path d="M8.5 8V6.5a3.5 3.5 0 0 1 7 0V8"/>`,task:`<rect x="5" y="4" width="14" height="17" rx="2"/><path d="M9 4V2.5h6V4M8.5 10h7M8.5 14h7M8.5 18h4"/>`,file:`<path d="M6 3h8l4 4v14H6V3Z"/><path d="M14 3v5h5M9 12h6M9 16h6"/>`,share:`<circle cx="6" cy="12" r="2.5"/><circle cx="18" cy="6" r="2.5"/><circle cx="18" cy="18" r="2.5"/><path d="m8.2 10.8 7.6-3.6M8.2 13.2l7.6 3.6"/>`,download:`<path d="M12 3v11M8 10.5l4 4 4-4M4 16v4h16v-4"/>`,copy:`<rect x="8" y="8" width="12" height="13" rx="2"/><path d="M16 8V3H4v13h4"/>`,close:`<path d="m5.5 5.5 13 13M18.5 5.5l-13 13"/>`,"arrow-left":`<path d="M20 12H4M10 6l-6 6 6 6"/>`,"arrow-right":`<path d="M4 12h16M14 6l6 6-6 6"/>`,check:`<path d="m4.5 12.5 5 5L20 6.5"/>`,tv:`<rect x="3" y="6" width="18" height="13" rx="2"/><path d="m8 2 4 4 4-4M8 11l5 3-5 3v-6Z"/>`,spark:`<path d="M12 2.5c.7 5.8 3.7 8.8 9.5 9.5-5.8.7-8.8 3.7-9.5 9.5-.7-5.8-3.7-8.8-9.5-9.5 5.8-.7 8.8-3.7 9.5-9.5Z" fill="currentColor" stroke="none"/>`,clock:`<circle cx="12" cy="12" r="9"/><path d="M12 6.5V12l4 2.5"/>`,flame:`<path d="M12.2 2.5c.4 4-1.8 5.2-3.2 7C7 12 5 13.6 5 16.4 5 19.5 8.1 22 12 22s7-2.5 7-5.6c0-2.2-1.1-4.4-3.1-6.4-.4 1.6-1.3 2.6-2.7 3 .5-3.1.2-7.3-1-10.5Z"/>`,heart:`<path d="M12 21s-8.5-5.1-8.5-11A4.5 4.5 0 0 1 12 7a4.5 4.5 0 0 1 8.5 3c0 5.9-8.5 11-8.5 11Z"/>`,star:`<path d="m12 2.8 2.8 5.8 6.4.9-4.6 4.5 1.1 6.4-5.7-3-5.7 3 1.1-6.4L3.8 9.5l6.4-.9L12 2.8Z" fill="currentColor" stroke="none"/>`,"chevron-right":`<path d="m9 5 7 7-7 7"/>`,dice:`<rect x="3" y="3" width="18" height="18" rx="4"/><circle cx="8.5" cy="8.5" r="1.2" fill="currentColor" stroke="none"/><circle cx="15.5" cy="8.5" r="1.2" fill="currentColor" stroke="none"/><circle cx="8.5" cy="15.5" r="1.2" fill="currentColor" stroke="none"/><circle cx="15.5" cy="15.5" r="1.2" fill="currentColor" stroke="none"/><circle cx="12" cy="12" r="1.2" fill="currentColor" stroke="none"/>`,home:`<path d="m3 11 9-8 9 8"/><path d="M5.5 9.5V21h13V9.5M9.5 21v-6h5v6"/>`,refresh:`<path d="M20 7v5h-5"/><path d="M19.1 16a8 8 0 1 1 .5-6.2L20 12"/>`,play:`<path d="M8 4.8v14.4L20 12 8 4.8Z" fill="currentColor" stroke="none"/>`,muscle:`<path d="M4 17.5c1.2-4.3 3.5-5.7 6-5.7 2.2 0 3-1.4 2.7-3.4-.2-1.8.8-3.4 2.6-3.4 2.2 0 3.4 1.8 3.4 4.2 0 5.2-3.6 8.3-7.5 9.2"/><path d="M7 20c2.2.8 4 0 5.5-1.6"/>`,weight:`<path d="M4 9h16l-1.5 11h-13L4 9Z"/><path d="M8 9a4 4 0 1 1 8 0"/><path d="M8.5 9V7.5h7V9"/>`,info:`<circle cx="12" cy="12" r="9"/><path d="M12 10.5V17M12 7.2v.3"/>`,trophy:`<path d="M8 4h8v5a4 4 0 0 1-8 0V4Z"/><path d="M8 6H4v2a4 4 0 0 0 4 4M16 6h4v2a4 4 0 0 1-4 4M12 13v5M8 21h8M9 21c0-2 1-3 3-3s3 1 3 3"/>`};function X(e,t=`icon`){return`<svg class="${t}" viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="square" stroke-linejoin="miter">${de[e]}</svg>`}var fe={double:{brand:`PIXEL PROTEIN`,product:`「快乐增肌水」`,copy:`0 糖 0 负担，一口回血，两口上头。
虚拟产品，仅为广告模拟。`,reward:`双倍奖励`,sticker:`GAIN!`},stamina:{brand:`PIXEL PROTEIN`,product:`「电子蛋白粉」`,copy:`冷萃像素味，粉质细腻，冲开就是干劲。
虚拟产品，仅为广告模拟。`,reward:`体力 +3`,sticker:`+3⚡`}};function Z(e){let{host:t,audio:r,variant:i,onRewarded:a,onCancelled:o}=e,s=e.durationMs??n.ad.durationMs,c=fe[i],l=s,u=!1,d=!1,f=0,p=document.createElement(`div`);p.className=`ad-overlay`,p.setAttribute(`role`,`dialog`),p.setAttribute(`aria-modal`,`true`),p.setAttribute(`aria-label`,`激励广告模拟`),p.innerHTML=`
    <div class="ad-card">
      <div class="ad-topline">
        <span class="ad-chip"><span class="ad-chip__dot"></span> 模拟激励广告</span>
        <button class="ad-close" type="button" aria-label="关闭广告，不要奖励">${X(`close`)}</button>
      </div>
      <div class="ad-creative">
        <div class="ad-creative__halftone" aria-hidden="true"></div>
        <div class="ad-brand">${c.brand}</div>
        <div class="ad-art" aria-hidden="true">
          <div class="ad-bottle">
            <span class="ad-bottle__cap"></span>
            <span class="ad-bottle__label">PIXEL<br/>FUEL</span>
          </div>
          <span class="ad-sticker">${e.rewardSticker??c.sticker}</span>
          <span class="ad-spark ad-spark--a"></span>
          <span class="ad-spark ad-spark--b"></span>
          <span class="ad-spark ad-spark--c"></span>
        </div>
        <h3 class="ad-product">${c.product}</h3>
        <p class="ad-copy">${c.copy.replace(`
`,`<br/>`)}</p>
      </div>
      <div class="ad-progress">
        <div class="ad-progress__meta">
          <span class="ad-progress__label">广告播放中</span>
          <span class="ad-progress__timer"><strong>${Math.ceil(l/1e3)}</strong>s</span>
        </div>
        <div class="ad-progress__track"><span class="ad-progress__fill"></span></div>
      </div>
      <div class="ad-reward">
        <span class="ad-reward__icon">${X(`tv`)}</span>
        <div>
          <strong>看完即得 ${e.rewardText??c.reward}</strong>
          <span>不看广告也能正常领取基础奖励</span>
        </div>
      </div>
      <p class="ad-real-hint">当前为模拟广告，正式版将接入微信激励视频</p>
    </div>
  `;let m=p.querySelector(`.ad-close`),h=p.querySelector(`.ad-progress__timer strong`),g=p.querySelector(`.ad-progress__fill`),_=p.querySelector(`.ad-progress__label`),v=()=>{d||(d=!0,window.clearInterval(C),window.clearTimeout(f),p.classList.add(`is-leaving`),window.setTimeout(()=>p.remove(),220))},y=()=>{u||d||(b(),o?.(),v())},b=()=>{window.clearInterval(C)},x=()=>{u||d||(u=!0,b(),m?.remove(),p.classList.add(`is-done`),h&&(h.textContent=`0`),_&&(_.textContent=`广告已看完`),g&&(g.style.width=`100%`),r.reward(),f=window.setTimeout(()=>{v(),a()},760))},S=performance.now(),C=window.setInterval(()=>{if(d)return;let e=performance.now()-S;l=Math.max(0,s-e);let t=Math.ceil(l/1e3);h&&(h.textContent=String(t)),g&&(g.style.width=`${Math.min(100,e/s*100)}%`),l<=0&&x()},100);return m?.addEventListener(`click`,y),p.addEventListener(`click`,e=>{e.target===p&&y()}),t.appendChild(p),requestAnimationFrame(()=>p.classList.add(`is-visible`)),v}function pe(e){let n=1,c=`ali`,l=`bulk`,u=y(s),d=!1,f=document.createElement(`div`);f.className=`screen screen--onboarding`,f.innerHTML=`

    <header class="ob-header">
      <div class="brand"><strong>PixelFit</strong><small>健身搭子养成</small></div>
      <button class="ob-back" type="button" id="ob-back" hidden aria-label="返回上一步">返回</button>
      <div class="ob-stepper" aria-label="引导进度"><span class="ob-stepper__num is-active" data-step-label="1">1</span><span class="ob-stepper__line"><i data-progress-line></i></span><span class="ob-stepper__num" data-step-label="2">2</span></div>
    </header>
    <div class="ob-body">
      <section class="ob-step is-active" data-step="1" aria-label="创建健身分身">
        <div class="ob-title-block"><h1 class="ob-title">选个搭子，一起开练</h1><p class="ob-subtitle">练一练，吃得明白，休息也算进步。</p></div>
        <div class="character-picker" role="radiogroup" aria-label="选择角色">
          ${r.map(e=>`
            <button class="character-chip ${e.id===c?`is-selected`:``}" type="button" role="radio" aria-checked="${e.id===c}" data-character="${e.id}">
              <span class="character-chip__art"><img src="/pixelfit/assets/char/${t[e.id]}.png" alt="" /></span>
              <span class="character-chip__name">${e.name}</span>
              <span class="character-chip__check">${X(`check`)}</span>
            </button>`).join(``)}
        </div>
        <label class="field"><span class="field__label">给自己起个名字</span><span class="field__control"><input id="nickname-input" class="field__input" type="text" maxlength="10" autocomplete="off" value="${u}" aria-label="你的昵称" /><button class="field__dice" type="button" id="random-name" aria-label="随机换一个昵称">${X(`dice`)}</button></span></label>
      </section>
      <section class="ob-step" data-step="2" aria-label="选择训练路线">
        <div class="ob-title-block"><h1 class="ob-title">今天，从哪个方向开始？</h1><p class="ob-subtitle">只是游戏的成长路线，按你的喜好来。</p></div>
        <div class="route-runner"><span class="route-runner__avatar" id="route-avatar"></span><div class="route-runner__copy"><strong id="route-nickname">${u}</strong><span>已经准备好啦</span></div></div>
        <div class="route-list" role="radiogroup" aria-label="选择训练路线">
          ${i.map(e=>`
            <button class="route-card ${e.id===l?`is-selected`:``}" type="button" role="radio" aria-checked="${e.id===l}" data-route="${e.id}">
              <span class="route-card__visual">${X(e.id===`bulk`?`dumbbell`:`flame`)}</span>
              <span class="route-card__body"><strong class="route-card__title">${e.name}</strong><span class="route-card__desc">${e.bonusLabel}</span></span>
              <span class="route-card__check">${X(`check`)}</span>
            </button>`).join(``)}
        </div>
        <p class="route-footnote">训练、饮食、睡眠都能玩。游戏属性不代表真实身体变化。</p>
      </section>
    </div>
    <footer class="ob-footer"><button class="pk-btn pk-btn--orange ob-cta" type="button" id="ob-next"><span class="ob-cta__label">下一步 · 选个训练方向</span>${X(`arrow-right`)}</button><p class="ob-footer__note">游客直接玩 · 本地自动存档</p></footer>
  `;let p=f.querySelector(`#ob-hero-art`),m=f.querySelector(`#ob-hero-en`),h=f.querySelector(`#ob-hero-name`),g=f.querySelector(`#ob-hero-trait`),_=f.querySelector(`#ob-hero-quote`),v=f.querySelector(`#nickname-input`),b=f.querySelector(`#ob-next`),x=f.querySelector(`.ob-cta__label`),S=Array.from(f.querySelectorAll(`.ob-step`)),C=Array.from(f.querySelectorAll(`.ob-stepper__num`)),w=f.querySelector(`[data-progress-line]`),T=f.querySelector(`#route-avatar`),E=f.querySelector(`#route-nickname`),D=f.querySelector(`#ob-back`),O=e=>{c=e;let n=a[e];p&&(p.innerHTML=`
        <div class="ob-hero__shadow" aria-hidden="true"></div>
        <img src="/pixelfit/assets/char/${t[e]}.png" alt="" />
        <span class="ob-hero__name-outline">${n.en}</span>
      `),m&&(m.textContent=n.en),h&&(h.textContent=n.name),g&&(g.textContent=`${n.epithet} · ${n.gender}`),_&&(_.textContent=`“${n.quote}”`),T&&(T.innerHTML=`<img src="/pixelfit/assets/char/${t[e]}.png" alt="" />`),f.querySelectorAll(`.character-chip`).forEach(t=>{let n=t.dataset.character===e;t.classList.toggle(`is-selected`,n),t.setAttribute(`aria-checked`,String(n))})},k=e=>{l=e;let t=o[e];f.querySelectorAll(`.route-card`).forEach(t=>{let n=t.dataset.route===e;t.classList.toggle(`is-selected`,n),t.setAttribute(`aria-checked`,String(n))});let n=f.querySelector(`.route-runner__tag`);n&&(n.textContent=t.name)},A=()=>{S.forEach(e=>{e.classList.toggle(`is-active`,Number(e.dataset.step)===n)}),C.forEach(e=>{e.classList.toggle(`is-active`,Number(e.dataset.stepLabel)<=n)}),w&&(w.style.transform=`scaleX(${n===1?.3:1})`),f.classList.toggle(`is-step-2`,n===2),D&&(D.hidden=n===1),x&&(x.textContent=n===1?`下一步 · 挑个训练方向`:`开张！进入我的健身房`);let e=f.querySelector(`.ob-body`);e&&(e.scrollTop=0),n===2&&(E&&v&&(E.textContent=v.value.trim()||u),k(l))},ee=()=>{let e=f.querySelector(`.character-chip[aria-checked="true"]`)?.dataset.character;e&&e in a&&O(e)};return f.addEventListener(`click`,t=>{let r=t.target,i=r.closest(`.character-chip`);if(i?.dataset.character){e.audio.tap(),O(i.dataset.character);return}let a=r.closest(`.route-card`);if(a?.dataset.route)e.audio.tap(),k(a.dataset.route);else if(r.closest(`#random-name`)){let t=y(s);for(;t===v?.value;)t=y(s);v&&(v.value=t,v.classList.remove(`is-shaking`),v.offsetWidth,v.classList.add(`is-shaking`)),e.audio.tap()}else if(r.closest(`#ob-back`))e.audio.tap(),n=1,A();else if(!r.closest(`.ob-header`)&&r.closest(`#ob-next`)){if(n===1){if(!v)return;u=v.value.trim().slice(0,10)||y(s),v.value=u,n=2,e.audio.countdown(!1),A();return}if(d)return;d=!0;let t=v?.value.trim().slice(0,10)||u||y(s);ee(),e.audio.startWhistle(),b?.classList.add(`is-busy`),x&&(x.textContent=`正在开张...`),window.setTimeout(()=>{e.complete({nickname:t,characterId:c,route:l})},360)}}),v?.addEventListener(`keydown`,e=>{e.key===`Enter`&&(e.preventDefault(),b?.click())}),O(c),k(l),A(),{element:f,cleanup(){f.replaceChildren()}}}var me=[`rice`,`banana`,`apple`,`broccoli`,`salmon`,`egg`,`corn`,`carrot`],he=`<svg class="icon" viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3.2"/><path d="M19.4 15a1.7 1.7 0 0 0 .34 1.87l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.7 1.7 0 0 0-1.87-.34 1.7 1.7 0 0 0-1 1.55V21a2 2 0 1 1-4 0v-.09a1.7 1.7 0 0 0-1-1.55 1.7 1.7 0 0 0-1.87.34l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.7 1.7 0 0 0 .34-1.87 1.7 1.7 0 0 0-1.55-1H3a2 2 0 1 1 0-4h.09a1.7 1.7 0 0 0 1.55-1 1.7 1.7 0 0 0-.34-1.87l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.7 1.7 0 0 0 1.87.34h.01a1.7 1.7 0 0 0 1-1.55V3a2 2 0 1 1 4 0v.09a1.7 1.7 0 0 0 1 1.55 1.7 1.7 0 0 0 1.87-.34l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.7 1.7 0 0 0-.34 1.87v.01a1.7 1.7 0 0 0 1.55 1H21a2 2 0 1 1 0 4h-.09a1.7 1.7 0 0 0-1.55 1Z"/></svg>`;function ge(e,t){let n=2166136261,r=`${e}:${t}`;for(let e=0;e<r.length;e+=1)n^=r.charCodeAt(e),n=Math.imul(n,16777619);return(n>>>0)%1e4/1e4}function _e(e){let t=6+Math.floor(ge(e,1)*3),n=[...me],r=[];for(let i=0;i<t;i+=1){let t=Math.floor(ge(e,i*7+3)*n.length)%n.length,a=n.splice(t,1)[0];a&&r.push(a)}return r.map((t,n)=>{let r=(ge(e,n*13+5)*40-20).toFixed(1);return`<img class="food-item" src="/pixelfit/assets/food-q/${t}.png" alt="" draggable="false" style="left:${(8+ge(e,n*17+9)*68).toFixed(1)}%;top:${(26+ge(e,n*19+11)*46).toFixed(1)}%;width:${Math.round(32+ge(e,n*23+7)*18)}px;transform:rotate(${r}deg);z-index:${n%2==0?2:6}">`}).join(``)}function ve(e){let{save:r}=e,i=r.profile;if(!i)throw Error(`Home screen requires a completed profile`);let o=a[i.characterId],s=r.workouts[0]??null,c=z(r.progress.level),l=Math.min(100,r.progress.xp/c*100),f=y(d[O(new Date().getHours())]),p=r.stats.totalWorkouts===0,m=[...o.gymLine,...u,f],h=_e(`${r.userId}:${i.characterId}`),g=0,{element:v}={element:document.createElement(`div`)};v.className=`screen screen--home`,v.innerHTML=`
    <div class="home-bg" aria-hidden="true">
      <span class="home-bg__warm"></span>
      <span class="home-bg__grain"></span>
    </div>

    <header class="home-top">
      <div class="home-tools" aria-label="快捷工具">
        <button class="qh-tool" type="button" data-tool="settings" aria-label="设置，即将开放">${he}</button>
        <button class="qh-tool" type="button" data-tool="bag" aria-label="背包，即将开放">${X(`bag`)}</button>
        <button class="qh-tool" type="button" data-tool="rank" aria-label="排行榜，即将开放">${X(`trophy`)}</button>
      </div>
      <div class="home-top__right">
        <div class="notice-board" role="note" aria-label="我的打卡记录">
          <span class="notice-board__nail notice-board__nail--tl" aria-hidden="true"></span>
          <span class="notice-board__nail notice-board__nail--tr" aria-hidden="true"></span>
          <span class="notice-board__nail notice-board__nail--bl" aria-hidden="true"></span>
          <span class="notice-board__nail notice-board__nail--br" aria-hidden="true"></span>
          <p class="notice-board__line">我的打卡 <strong>${x(r.stats.totalWorkouts)}</strong>次</p>
          <p class="notice-board__line">连续坚持 <strong>${x(r.stats.streakDays)}</strong>天</p>
        </div>
        <button class="qh-tool qh-tool--sound" type="button" id="sound-toggle" aria-label="${r.settings.sound?`关闭声音`:`开启声音`}">
          ${X(r.settings.sound?`sound`:`mute`)}
        </button>
      </div>
    </header>

    <section class="status-pills" aria-label="角色状态">
      <div class="pill pill--level" aria-label="等级 ${r.progress.level}">
        ${X(`spark`)}<b>LV.${r.progress.level}</b>
      </div>
      <div class="pill pill--coin" aria-label="金币 ${r.progress.coins}">
        ${X(`coin`)}<b>${x(r.progress.coins)}</b>
      </div>
      <button class="pill pill--stamina" type="button" id="stamina-button" aria-label="体力 ${r.progress.stamina} / ${n.stamina.max}，点击补充">
        ${X(`bolt`)}<b data-stamina-value>${r.progress.stamina}</b><i>/${n.stamina.max}</i>
        <em class="pill__plus">+</em>
      </button>
    </section>

    <section class="table-stage" aria-label="今日桌台">
      <div class="rank-tag" aria-label="我的角色">
        <strong>LV.${r.progress.level}</strong>
        <span>${_(i.nickname)}</span>
        <em>${X(`bolt`)} ${x(r.stats.totalHits)} 次</em>
      </div>

      <div class="speech-bubble" id="speech-bubble">
        <span class="speech-bubble__text" id="speech-text">${_(p?`第一次来？戳戳我，然后开练。`:y(o.gymLine))}</span>
      </div>

      <div class="dinner-table" aria-hidden="true">
        <span class="dinner-table__edge"></span>
        <span class="dinner-table__top"></span>
        <span class="dinner-table__glint"></span>
      </div>

      <div class="food-pile" aria-hidden="true">${h}</div>

      <button class="character-button" type="button" id="character-button" aria-label="戳一戳你的健身分身">
        <span class="character-button__shadow" aria-hidden="true"></span>
        <img class="character-button__art" id="home-character" src="/pixelfit/assets/char/${t[i.characterId]}.png" alt="${_(o.name)}">
      </button>
    </section>

    <nav class="mode-row" aria-label="选择玩法">
      <button class="mode-card mode-card--diet" type="button" data-mode="diet" aria-label="饮食，健身包食材分类，九十秒">
        ${X(`heart`)}<span>饮食</span>
      </button>
      <button class="mode-card mode-card--sleep" type="button" data-mode="sleep" aria-label="睡眠，恢复体力">
        ${X(`clock`)}<span>睡眠</span>
      </button>
      <button class="mode-card mode-card--warmup warmup-link" type="button" data-mode="warmup" aria-label="热身场，20 秒拳击">
        ${X(`flame`)}<span>热身场</span>
      </button>
    </nav>

    <footer class="home-bottom">
      <button class="pk-btn pk-btn--orange mode-card mode-card--train home-start-btn" type="button" id="start-training" data-mode="training" aria-label="开始训练">
        ${X(`dumbbell`)}<span>开始训练</span>
      </button>
      <p class="home-start-note" data-stamina-note>今日首练 +${n.training.rewards.dailyFirstCoins} 金币 · 体力 ${r.progress.stamina}/${n.stamina.max}</p>

      <div class="quick-grid" aria-label="功能入口">
        ${n.reservedEntries.map(e=>e.id===`archive`&&s?`
            <button class="quick-entry" type="button" id="last-share" aria-label="查看最近成长小票">
              <span class="quick-entry__icon">${X(`file`)}</span>
              <span class="quick-entry__label">成长小票</span>
              <span class="quick-entry__soon">查看 / 保存</span>
            </button>`:`
            <button class="quick-entry" type="button" data-entry="${e.id}" aria-label="${e.label}，即将开放">
              <span class="quick-entry__icon">${X(e.icon)}</span>
              <span class="quick-entry__label">${e.label}</span>
              <span class="quick-entry__soon">即将开放</span>
            </button>`).join(``)}
      </div>
      <span class="home-version" aria-hidden="true">${n.versionLabel}</span>
    </footer>
  `;let b=v.querySelector(`#home-character`),S=v.querySelector(`#speech-text`),w=v.querySelector(`#speech-bubble`),T=v.querySelector(`[data-stamina-value]`),E=v.querySelector(`#stamina-button`),D=v.querySelectorAll(`.mode-card`),k=v.querySelector(`.pill--level`),A=()=>{V(r)&&e.persist(),T&&(T.textContent=String(r.progress.stamina));let t=r.progress.stamina>=n.training.staminaCost;D.forEach(e=>{let n=e.dataset.mode!==`sleep`;e.classList.toggle(`is-empty`,n&&!t)});let i=v.querySelector(`[data-stamina-note]`);if(i&&(i.innerHTML=t?`今日首练 +${n.training.rewards.dailyFirstCoins} 金币 · 体力 ${r.progress.stamina}/${n.stamina.max}`:`${X(`bolt`)} 体力见底，去睡一觉`),E){let e=U(r);E.setAttribute(`aria-label`,`体力 ${r.progress.stamina} / ${n.stamina.max}，点击补充`),E.title=e.full?`体力满格`:`${C(e.nextInMs)} 后恢复 1 点体力`}k&&k.style.setProperty(`--xp`,`${l.toFixed(1)}%`)},ee=()=>{b&&(b.classList.remove(`is-bouncing`),b.offsetWidth,b.classList.add(`is-bouncing`))},te=()=>{e.audio.tap(),ee(),g=(g+1)%m.length;let t=m[g]??o.quote;S&&(S.textContent=t),w&&(w.classList.remove(`is-popping`),w.offsetWidth,w.classList.add(`is-popping`))},ne=t=>{if(A(),t===`sleep`){e.audio.tap(),e.startSleep();return}let i=t===`diet`?n.diet.staminaCost:n.training.staminaCost;r.progress.stamina<i?(e.audio.error(),e.openEnergySheet()):(e.audio.startWhistle(),t===`warmup`?e.startWarmup():t===`diet`?e.startDiet():e.startTraining())};v.querySelector(`#character-button`)?.addEventListener(`click`,te),v.querySelector(`#last-share`)?.addEventListener(`click`,()=>{s&&(e.audio.tap(),e.openShare(s))}),v.querySelector(`#sound-toggle`)?.addEventListener(`click`,t=>{let n=e.toggleSound(),r=t.currentTarget;r.innerHTML=X(n?`sound`:`mute`),r.setAttribute(`aria-label`,n?`关闭声音`:`开启声音`),n&&e.audio.tap(),e.toast(n?`声音已开启`:`已静音，专心练`,`default`)}),E?.addEventListener(`click`,()=>{e.audio.tap(),e.openEnergySheet()}),v.querySelectorAll(`[data-mode]`).forEach(e=>{e.addEventListener(`click`,()=>ne(e.dataset.mode??``))}),v.querySelectorAll(`.quick-entry[data-entry]`).forEach(t=>{t.addEventListener(`click`,()=>{e.audio.tap(),e.openReserved(t.dataset.entry??``)})}),v.querySelectorAll(`.qh-tool`).forEach(t=>{t.id!==`sound-toggle`&&t.addEventListener(`click`,()=>{e.audio.tap(),e.toast(`即将开放`)})}),A();let j=window.setInterval(A,1e3);return{element:v,cleanup(){window.clearInterval(j),v.replaceChildren()}}}function ye(e){let t=Math.max(0,e.durationMs),n=Math.max(16,e.tickMs??100),r=0,i=null,a=null,o=!1,s=!1,c=()=>typeof performance>`u`?Date.now():performance.now(),l=()=>{let e=i===null?0:c()-i;return Math.min(t,r+e)},u=()=>Math.max(0,t-l()),d=()=>({remainingMs:u(),elapsedMs:l(),totalMs:t,paused:i===null,finished:s}),f=()=>{a!==null&&(window.clearInterval(a),a=null)},p=()=>{s||(s=!0,i!==null&&(r=Math.min(t,r+(c()-i)),i=null),f(),e.onTick?.(d()),e.onFinish?.())},m=()=>{s||(l()>=t?p():e.onTick?.(d()))},h=()=>{a===null&&(a=window.setInterval(()=>{i!==null&&m()},n))};return{start(){o||s||(o=!0,r=0,i=c(),h(),m())},pause(){o&&!s&&i!==null&&(r=Math.min(t,r+(c()-i)),i=null,m())},resume(){o&&!s&&i===null&&(i=c(),h(),m())},stop(){f(),i!==null&&(r=Math.min(t,r+(c()-i))),i=null,o=!1,s=!0},addRemaining(e){if(s)return;let n=Math.min(t,u()+e);r=t-n-(i===null?0:c()-i),r=Math.max(0,r),m()},remainingMs:u,elapsedMs:l,isPaused(){return i===null},isFinished(){return s},state(){return d()}}}var be=`data-drop-target`,xe=`is-drop-target`,Q=`is-dragging`;function $(e){return[`position:fixed`,`left:0`,`top:0`,`margin:0`,`width:${e.width}px`,`height:${e.height}px`,`z-index:9999`,`pointer-events:none`,`user-select:none`,`will-change:transform`,`transform-origin:center`,`filter:drop-shadow(0 12px 24px rgba(0,0,0,.45))`].join(`;`)}function Se(e){document.body.style.userSelect=e}function Ce(e){let t=e?.closest(`[${be}]`);if(!(t instanceof HTMLElement))return{key:null,element:null};let n=t.getAttribute(be);return n===null||n===``?{key:null,element:null}:{key:n,element:t}}function we(e){e.overElement?.classList.remove(xe),e.overElement=null,e.overKey=null}function Te(e){let t=e.thresholdPx??6,n=new Map,r=null,i=!1,a=()=>{if(!r)return;let e=r;r=null,e.ghost?.remove(),e.started&&e.source.classList.remove(Q),Se(``),window.removeEventListener(`pointermove`,o),window.removeEventListener(`pointerup`,s),window.removeEventListener(`pointercancel`,c),window.removeEventListener(`keydown`,l)},o=n=>{if(!r||n.pointerId!==r.pointerId)return;let i=r;if(!i.started){let r=n.clientX-i.startX,a=n.clientY-i.startY;if(Math.hypot(r,a)<t)return;i.started=!0,i.source.classList.add(Q),Se(`none`);let o=i.source.getBoundingClientRect(),s=i.source.cloneNode(!0);s.removeAttribute(`id`),s.style.cssText=$(o),s.setAttribute(`aria-hidden`,`true`),document.body.append(s),i.ghost=s,e.onDragStart?.(i.payload)}n.preventDefault();let a=i.ghost;if(a){let e=n.clientX-i.grabOffsetX,t=n.clientY-i.grabOffsetY;a.style.transform=`translate3d(${e}px, ${t}px, 0) scale(1.04)`}let o=i.ghost;o&&(o.style.visibility=`hidden`);let s=document.elementFromPoint(n.clientX,n.clientY);o&&(o.style.visibility=``);let{key:c,element:l}=Ce(s);c!==i.overKey&&(we(i),i.overKey=c,i.overElement=l,l?.classList.add(xe),e.onDragMove?.(i.payload,c))},s=t=>{if(!r||t.pointerId!==r.pointerId)return;let n=r,i=n.started,o=n.overKey;we(n),a(),i?e.onDrop(n.payload,o):e.onTap?.(n.payload)},c=t=>{if(!r||t.pointerId!==r.pointerId)return;let n=r,i=n.started;we(n),a(),i&&e.onCancel?.(n.payload)},l=t=>{if(t.key!==`Escape`||!r)return;let n=r,i=n.started;we(n),a(),i&&e.onCancel?.(n.payload)};return{bind:(e,t)=>{n.get(e)?.();let u=n=>{if(i||r||n.button!==0&&n.pointerType===`mouse`||!n.isPrimary)return;let a=e.getBoundingClientRect();r={payload:t,source:e,pointerId:n.pointerId,startX:n.clientX,startY:n.clientY,grabOffsetX:n.clientX-a.left,grabOffsetY:n.clientY-a.top,started:!1,ghost:null,overKey:null,overElement:null},e.style.touchAction=`none`,window.addEventListener(`pointermove`,o,{passive:!1}),window.addEventListener(`pointerup`,s),window.addEventListener(`pointercancel`,c),window.addEventListener(`keydown`,l)};e.addEventListener(`pointerdown`,u);let d=()=>{e.removeEventListener(`pointerdown`,u),r?.source===e&&(we(r),a()),n.delete(e)};return n.set(e,d),d},setLocked(e){i=e,e&&r&&(we(r),a())},destroy(){for(let e of[...n.values()])e();n.clear()},isDragging(){return r?.started===!0}}}function Ee(e){return De(e).closed}function De(e){let t=document.createElement(`div`),n=document.activeElement;t.className=`pk-modal science-card`,t.setAttribute(`role`,`dialog`),t.setAttribute(`aria-modal`,`true`),t.style.setProperty(`--science-accent`,e.accent??``),t.innerHTML=`
    <div class="pk-modal__card" tabindex="-1">
      <div class="pk-modal__bar pk-modal__bar--cyan"></div>
      <button class="pk-modal__close" type="button" aria-label="关闭">×</button>
      <div class="pk-modal__body">
        <h3 class="science-card__title"></h3>
        <p class="science-card__body"></p>
      </div>
      <button class="pk-btn pk-btn--green pk-modal__confirm science-card__confirm" type="button"></button>
    </div>
  `;let r=t.querySelector(`.pk-modal__bar`),i=t.querySelector(`.science-card__title`),a=t.querySelector(`.science-card__body`),o=t.querySelector(`.science-card__confirm`),s=t.querySelector(`.pk-modal__card`);if(!r||!i||!a||!o||!s)throw Error(`science card markup is incomplete`);if(r.textContent=e.tag??`小知识`,e.imageUrl){let t=document.createElement(`img`);t.className=`science-card__food`,t.src=e.imageUrl,t.alt=e.title,i.before(t)}i.textContent=e.title,a.textContent=e.body,o.textContent=e.confirmLabel??`我知道了`;let c=()=>{},l=new Promise(e=>{c=e}),u=!1,d=()=>{u||(u=!0,t.remove(),document.removeEventListener(`keydown`,f,!0),n instanceof HTMLElement&&n.isConnected&&n.focus({preventScroll:!0}),c())},f=e=>{(e.key===`Enter`||e.key===`Escape`||e.key===` `)&&(e.preventDefault(),e.stopPropagation(),d())};return o.addEventListener(`click`,d),t.querySelector(`.pk-modal__close`)?.addEventListener(`click`,d),t.addEventListener(`click`,e=>{e.target===t&&d()}),document.addEventListener(`keydown`,f,!0),document.body.append(t),requestAnimationFrame(()=>{o.focus({preventScroll:!0})}),{element:t,close:d,closed:l}}function Oe(e){let t=e.tone??`cyan`,n=e.closable??!0,r=document.createElement(`div`);r.className=`pk-modal`,r.setAttribute(`role`,`dialog`),r.setAttribute(`aria-modal`,`true`),r.innerHTML=`
    <div class="pk-modal__card">
      <div class="pk-modal__bar pk-modal__bar--${t}">${e.title}</div>
      ${n?`<button class="pk-modal__close" type="button" aria-label="关闭">×</button>`:``}
      <div class="pk-modal__body">${e.content}</div>
      ${e.confirmText?`<button class="pk-btn pk-btn--${e.confirmTone??`green`} pk-modal__confirm" type="button">${e.confirmText}</button>`:``}
    </div>
  `;let i,a=new Promise(e=>{i=e}),o=!1,s=()=>{o||(o=!0,r.remove(),document.removeEventListener(`keydown`,c,!0),i(`closed`),e.onClose?.())},c=e=>{e.key===`Escape`&&n&&(e.preventDefault(),s())};return r.querySelector(`.pk-modal__close`)?.addEventListener(`click`,s),r.addEventListener(`click`,e=>{e.target===r&&n&&s()}),r.querySelector(`.pk-modal__confirm`)?.addEventListener(`click`,()=>{o||(o=!0,r.remove(),document.removeEventListener(`keydown`,c,!0),i(`confirm`),e.onConfirm?.())}),document.addEventListener(`keydown`,c,!0),document.body.append(r),{close:s,element:r,result:a}}function ke(e){let t=document.createElement(`div`);t.className=`pk-polaroid`,t.setAttribute(`role`,`dialog`),t.setAttribute(`aria-modal`,`true`),t.innerHTML=`
    <div class="pk-polaroid__ribbon pk-polaroid__ribbon--${e.variant}">${e.ribbonText}</div>
    <div class="pk-polaroid__card">
      <span class="pk-polaroid__pin" aria-hidden="true"></span>
      <div class="pk-polaroid__photo">${e.photoHTML}</div>
      <p class="pk-polaroid__caption">${e.caption}</p>
    </div>
    ${e.actionText?`<div class="pk-polaroid__actions"><button class="pk-btn pk-btn--${e.actionTone??`orange`}" type="button">${e.actionText}</button></div>`:`<p class="pk-polaroid__hint">${e.hint??`点击继续`}</p>`}
  `;let n,r=new Promise(e=>{n=e}),i=!1,a=()=>{i||(i=!0,t.remove(),n())};return e.actionText?t.querySelector(`.pk-btn`)?.addEventListener(`click`,a):t.addEventListener(`click`,a),document.body.append(t),{close:a,element:t,result:r}}var Ae=n.conveyor,je=6,Me=104,Ne=[`chest`,`back`,`shoulder`,`abs`,`leg`],Pe={chest:`胸`,back:`背`,shoulder:`肩`,abs:`腹`,leg:`腿`};function Fe(e){let t=g.filter(t=>!e.has(t.id));return t.length===0?null:t[Math.floor(Math.random()*t.length)]??null}function Ie(e){let t=m[e];return`
    <button class="training-muscle-card" type="button" data-muscle="${t.id}">
      <span class="training-muscle-card__glyph" aria-hidden="true">${t.glyph}</span>
      <strong class="training-muscle-card__name">${Pe[e]}</strong>
    </button>`}function Le(e){let{save:n}=e,r=n.profile;if(!r)throw Error(`Training requires a profile`);let i=a[r.characterId],o=document.createElement(`div`);o.className=`screen screen--training`;let s=`select`,c=`chest`,u=`chest`,d=0,f=0,p=0,h=0,g=0,_=0,v=!1,y=0,b=0,x=0,S=!1,w=!1,T=!1,E=null,D=[],O=new Set,A=new Map,ne=[],j=(e,t)=>{let n=window.setTimeout(()=>{D.splice(D.indexOf(n),1),v||e()},t);return D.push(n),n},re=()=>{D.forEach(e=>window.clearTimeout(e)),D.length=0,O.forEach(e=>window.clearTimeout(e)),O.clear()},M=(e,t,n=340)=>{if(!e)return;e.classList.remove(t),e.offsetWidth,e.classList.add(t);let r=window.setTimeout(()=>{O.delete(r),e.classList.remove(t)},n);O.add(r)},N=(e,t)=>{let n=window.setTimeout(()=>{O.delete(n),e.remove()},t);O.add(n)};o.innerHTML=`
    <section class="training-select" id="training-select">
      <header class="training-select__header">
        <button class="training-back" type="button" id="training-back" aria-label="返回首页">
          ${X(`arrow-left`)}<span>返回</span>
        </button>
        <div class="training-select__title">
          <p class="eyebrow">EQUIPMENT SORT · 90S</p>
          <h1>器械分类训练</h1>
          <span>选一个肌群关卡，把对应的器械从传送带上拖下来。</span>
        </div>
      </header>
      <div class="training-select__hero" aria-hidden="true"><span>🏋️</span></div>
      <footer class="training-select__footer">
        ${X(`info`)} 拖错不扣分，会弹一条器械小知识；没拖住滑走也不算错。
      </footer>
    </section>

    <div class="training-game" id="training-game" hidden></div>
  `;let P=o.querySelector(`#training-select`),F=o.querySelector(`#training-game`),I=null,ie=null,L=null,ae=null,oe=null,se=null,R=null,z=null,B=null,V=null,ce=null,H=null,U=null,le=null,ue=null,W=null,G=null,K=null,q=null,J=null,Y=null,de=e=>{ie&&(ie.textContent=C(e)),L&&(L.style.transform=`scaleX(${Math.max(0,e/Ae.durationMs)})`);let t=e<=5e3&&s===`playing`;o.classList.toggle(`is-final-stretch`,t)},fe=()=>{ae&&(ae.textContent=String(d)),oe&&(oe.textContent=String(p)),se&&(se.textContent=String(f)),R?.classList.toggle(`is-live`,f>=2)},Z=()=>{le&&(le.textContent=`${f}x`),ue&&(ue.textContent=ee(h,l)),M(U,`is-visible`,900),e.audio.comboMilestone(),te([10,35,18])},pe=e=>{e.removed||(e.removed=!0,A.delete(e.id),e.unbind(),e.el.remove(),f=0,g=0,fe())},me=(e,t)=>{if(!V||!B)return;let n=V.getBoundingClientRect(),r=e.getBoundingClientRect(),i=B.getBoundingClientRect(),a=document.createElement(`div`);a.className=`training-fly`,a.innerHTML=`
      <span class="training-item__glyph">${t.glyph}</span>
      <span class="training-item__name">${t.name}</span>`,a.style.left=`${r.left-n.left}px`,a.style.top=`${r.top-n.top}px`,a.style.width=`${r.width}px`,a.style.height=`${r.height}px`,V.append(a),a.offsetWidth,a.style.transform=`translate3d(${i.left-r.left+(i.width-r.width)/2}px, ${i.top-r.top+(i.height-r.height)/2}px, 0) scale(0.22) rotate(10deg)`,a.style.opacity=`0.85`,a.addEventListener(`transitionend`,()=>a.remove(),{once:!0}),N(a,720),M(B,`is-pop`,420)},he=e=>{if(!V||!B)return;let t=V.getBoundingClientRect(),n=B.getBoundingClientRect(),r=document.createElement(`span`);r.className=`training-float training-float--good`,r.textContent=e,r.style.left=`${n.left-t.left+n.width/2}px`,r.style.top=`${n.top-t.top-6}px`,V.append(r),N(r,900)},ge=t=>{t.removed=!0,A.delete(t.id),t.unbind(),e.audio.coin(),d+=1;let n=performance.now();f=g&&n-g<=Ae.comboWindowMs?f+1:1,g=n,p=Math.max(p,f),f%5==0&&(h+=1,Z()),fe(),me(t.el,t.equipment),t.el.remove(),he(`正确 +1`),M(ce,`is-cheering`,340),te(18)},_e=async t=>{w=!0,S=!0,Q.pause(),$.setLocked(!0),I&&(I.disabled=!0),M(t.el,`is-wrong`,500),e.audio.error();let n=m[t.equipment.muscles[0]??c];try{await Ee({title:`这是${t.equipment.name}`,body:t.equipment.science,accent:n.accent,tag:`器械小知识`})}finally{v||($.setLocked(!1),S=!1,Q.resume(),w=!1,I&&s===`playing`&&(I.disabled=!1))}},ve=(e,t)=>{if(s!==`playing`||S||v||t===null)return;let n=A.get(e.data.itemId);n&&!n.removed&&(n.equipment.muscles.includes(c)?ge(n):_e(n))},be=()=>{if(!z)return;let e=Fe(new Set(ne));if(!e)return;ne.push(e.id),ne.length>2&&ne.shift();let t=document.createElement(`div`);t.className=`training-item`,t.setAttribute(`aria-label`,e.name),t.innerHTML=`
      <span class="training-item__glyph" aria-hidden="true">${e.glyph}</span>
      <span class="training-item__name">${e.name}</span>`,t.style.transform=`translate3d(0px, -50%, 0)`,z.append(t);let n=k(`belt`),r={id:n,equipment:e,el:t,progress:0,removed:!1,unbind:$.bind(t,{key:n,data:{itemId:n,equipment:e}})};A.set(n,r)},xe=e=>{if(v||s!==`playing`)return;b||=e;let t=Math.min(110,Math.max(0,e-b));if(b=e,!S&&z){let e=z.clientWidth+Me+16;for(let n of[...A.values()])n.removed||(n.progress+=t/Ae.itemTravelMs,n.progress>=1?pe(n):n.el.style.transform=`translate3d(${-n.progress*e}px, -50%, 0)`);let n=Q.elapsedMs();for(;n>=x&&A.size<je;)be(),x+=Ae.itemIntervalMs}y=window.requestAnimationFrame(xe)},Q=ye({durationMs:Ae.durationMs,tickMs:200,onTick:e=>de(e.remainingMs),onFinish:()=>{if(s!==`playing`||T||v)return;T=!0,s=`finishing`,S=!0,$.setLocked(!0),window.cancelAnimationFrame(y),Q.stop(),I&&(I.disabled=!0),H&&H.classList.add(`is-hidden`);let t=Date.now();Y&&(Y.textContent=String(d)),J&&(J.hidden=!1),e.audio.finisher(),j(()=>e.audio.victory(),520);let n={mode:`conveyor`,muscle:c,hits:d,maxCombo:p,durationSec:Math.round(Ae.durationMs/1e3),milestones:h,startedAt:_,endedAt:t};j(()=>{v||(s=`done`,e.onComplete(n))},2e3)}}),$=Te({onDragStart:()=>e.audio.tap(),onDrop:(e,t)=>ve(e,t)}),Se=()=>{v||(s=`playing`,_=Date.now(),S=!1,x=0,W&&(W.hidden=!0),I&&(I.disabled=!1),e.audio.startWhistle(),Q.start(),b=0,y=window.requestAnimationFrame(xe),j(()=>H?.classList.add(`is-dim`),5e3))},Ce=()=>{if(v)return;e.audio.countdown(!1);let t=m[c];G&&(G.textContent=`3`),K&&(K.textContent=`${t.glyph} ${t.label} · ${t.hint}`);let n=Ae.countdownMs/3;j(()=>{G&&(G.textContent=`2`),e.audio.countdown(!1)},n),j(()=>{G&&(G.textContent=`1`),e.audio.countdown(!1)},n*2),j(()=>{G&&(G.textContent=`开始!`,G.classList.add(`is-go`)),e.audio.countdown(!0)},Ae.countdownMs-350),j(Se,Ae.countdownMs)},we=e=>{if(s!==`select`||v||!F)return;c=e;let n=m[c];F.innerHTML=`
      <header class="training-hud">
        <button class="training-exit" type="button" id="training-exit" disabled aria-label="暂停本局">
          ${X(`close`)}<span>暂停</span>
        </button>
        <div class="training-hud__center">
          <div class="training-hud__timer" role="timer" aria-live="off">
            <span class="training-hud__clock" aria-hidden="true">${X(`clock`)}</span>
            <strong id="training-timer-text">${C(Ae.durationMs)}</strong>
            <i class="training-hud__bar" id="training-timer-bar" aria-hidden="true"></i>
          </div>
        </div>
        <div class="training-hud__stats">
          <div class="training-stat"><span>挑对数</span><strong id="training-hits">0</strong></div>
          <div class="training-stat"><span>最高连对</span><strong id="training-max-combo">0</strong></div>
          <span class="training-hud__muscle" id="training-muscle-tag">${n.glyph} ${n.label}</span>
        </div>
      </header>

      <div class="training-stage">
        <div class="training-track" id="training-track">
          <div class="training-track__belt" aria-hidden="true"></div>
          <div class="training-track__edge training-track__edge--left" aria-hidden="true"></div>
          <div class="training-track__edge training-track__edge--right" aria-hidden="true"></div>
        </div>

        <div class="training-stage__mid">
          <div class="training-character" id="training-character" aria-hidden="true">
            <img class="training-character__img" src="/pixelfit/assets/char/${t[i.id]??`char-male-slim`}.png" alt="" />
          </div>
          <div class="training-combo-chip" id="training-combo-chip">
            <span>连对</span><strong id="training-combo">0</strong>
          </div>
          <div class="training-stage__hint" id="training-stage-hint">
            <span>把「${n.label}」器械拖进下方分区</span>
            <em>看准再拖 · 拖错要看一条小知识</em>
          </div>
        </div>

        <div class="training-zone" id="training-zone" data-drop-target="${c}">
          <span class="training-zone__glyph" aria-hidden="true">${n.glyph}</span>
          <span class="training-zone__copy">
            <strong>只接 ${n.label} 部器械</strong>
            <em>${n.hint} · 拖到这里松手</em>
          </span>
          <span class="training-zone__arrow" aria-hidden="true">▼</span>
        </div>

        <div class="training-fx" id="training-fx" aria-hidden="true"></div>
        <div class="training-milestone" id="training-milestone" aria-live="polite">
          <strong id="training-milestone-count">5x</strong>
          <em id="training-milestone-copy"></em>
        </div>

        <div class="training-countdown" id="training-countdown">
          <div class="training-countdown__card">
            <span class="training-countdown__eyebrow">GEAR UP</span>
            <strong class="training-countdown__number" id="training-countdown-number">3</strong>
            <span class="training-countdown__label" id="training-countdown-label"></span>
          </div>
        </div>

        <div class="training-quit-overlay" id="training-quit-overlay" hidden>
          <div class="training-quit-card" role="dialog" aria-modal="true" aria-labelledby="training-quit-title">
            <span class="training-quit-card__eyebrow">HOLD ON</span>
            <h2 id="training-quit-title">这局不练了？</h2>
            <p>现在退出不会结算奖励，也不会扣体力。</p>
            <div class="training-quit-card__actions">
              <button class="pk-btn pk-btn--green" type="button" id="training-quit-continue">${X(`play`)} 继续分类</button>
              <button class="pk-btn pk-btn--orange" type="button" id="training-quit-confirm">确定退出</button>
            </div>
          </div>
        </div>

        <div class="training-finish" id="training-finish" hidden>
          <div class="training-finish__card">
            <span class="training-finish__eyebrow">ROUND CLEAR</span>
            <strong class="training-finish__number" id="training-finish-hits">0</strong>
            <span class="training-finish__label">件器械正确分类</span>
            <em>正在结算...</em>
          </div>
        </div>
      </div>
    `,I=F.querySelector(`#training-exit`),ie=F.querySelector(`#training-timer-text`),L=F.querySelector(`#training-timer-bar`),ae=F.querySelector(`#training-hits`),oe=F.querySelector(`#training-max-combo`),se=F.querySelector(`#training-combo`),R=F.querySelector(`#training-combo-chip`),z=F.querySelector(`#training-track`),B=F.querySelector(`#training-zone`),V=F.querySelector(`#training-fx`),ce=F.querySelector(`#training-character`),H=F.querySelector(`#training-stage-hint`),U=F.querySelector(`#training-milestone`),le=F.querySelector(`#training-milestone-count`),ue=F.querySelector(`#training-milestone-copy`),W=F.querySelector(`#training-countdown`),G=F.querySelector(`#training-countdown-number`),K=F.querySelector(`#training-countdown-label`),q=F.querySelector(`#training-quit-overlay`),J=F.querySelector(`#training-finish`),Y=F.querySelector(`#training-finish-hits`),P?.classList.add(`training-hide`),F.hidden=!1,s=`countdown`,Ce()},De=()=>{E=Oe({title:`选择训练部位`,tone:`orange`,content:`
        <div class="training-muscle-grid">
          ${Ne.map(Ie).join(``)}
        </div>
        <p class="training-modal-tip">选一个肌群，开始 90 秒器械分类</p>`,confirmText:`开始训练`,closable:!0,onConfirm:()=>{e.audio.tap(),we(u)},onClose:()=>{e.audio.tap(),e.onQuit()}});let t=E.element.querySelectorAll(`.training-muscle-card`);t.forEach(n=>{n.addEventListener(`click`,()=>{e.audio.tap(),t.forEach(e=>e.classList.toggle(`is-picked`,e===n));let r=n.dataset.muscle;r&&(u=r)})})},ke=()=>{s!==`playing`||w||v||(S=!0,Q.pause(),$.setLocked(!0),I&&(I.disabled=!0),q&&(q.hidden=!1))},Pe=()=>{!q||q.hidden||s!==`playing`||v||(q.hidden=!0,$.setLocked(!1),S=!1,Q.resume(),I&&(I.disabled=!1))},Le=()=>{v||s===`done`||(s=`done`,Be(),e.onQuit())};o.addEventListener(`click`,t=>{let n=t.target;n.closest(`#training-back`)?(e.audio.tap(),e.onQuit()):n.closest(`#training-exit`)?(e.audio.tap(),ke()):n.closest(`#training-quit-continue`)?(e.audio.tap(),Pe()):n.closest(`#training-quit-confirm`)?(e.audio.tap(),Le()):q&&t.target===q&&Pe()});let Re=e=>{e.key===`Escape`&&q&&!q.hidden&&s===`playing`&&(e.preventDefault(),Pe())};window.addEventListener(`keydown`,Re);let ze=()=>{document.hidden&&s===`playing`&&!w&&q?.hidden&&ke()};document.addEventListener(`visibilitychange`,ze);function Be(){v||(v=!0,E?.close(),window.cancelAnimationFrame(y),Q.stop(),$.destroy(),re(),window.removeEventListener(`keydown`,Re),document.removeEventListener(`visibilitychange`,ze),o.replaceChildren())}return De(),{element:o,cleanup:Be}}var Re=2*Math.PI*44;function ze(e){let{save:r}=e,i=r.profile;if(!i)throw Error(`Training requires a profile`);let s=a[i.characterId]??a.ali,u=o[i.route]??o.bulk,d=`<img class="warmup-character" src="/pixelfit/assets/char/${t[s.id]}.png" alt="" />`,{durationMs:f,comboWindowMs:p}=n.training,m=document.createElement(`div`);m.className=`screen screen--training`,m.style.setProperty(`--route-accent`,`var(--pk-orange)`),m.innerHTML=`
    <div class="training-bg" aria-hidden="true">
      <span class="training-bg__sun"></span>
      <span class="training-bg__grid"></span>
      <span class="training-bg__noise"></span>
      <span class="training-bg__word">PUNCH<br/>TIME</span>
    </div>

    <header class="training-top">
      <button class="training-quit" type="button" id="quit-training" disabled aria-label="退出训练">
        ${X(`close`)}<span>退出</span>
      </button>
      <div class="training-timer" id="training-timer" aria-label="剩余时间">
        <svg class="timer-ring" viewBox="0 0 100 100" aria-hidden="true">
          <circle class="timer-ring__track" cx="50" cy="50" r="44"></circle>
          <circle class="timer-ring__value" id="timer-ring" cx="50" cy="50" r="44"
            style="stroke-dasharray:${Re}"></circle>
        </svg>
        <div class="timer-readout">
          <strong id="timer-text">20.0</strong>
          <span>SECONDS</span>
        </div>
      </div>
      <div class="training-score">
        <span>PUNCHES</span>
        <strong id="hit-count">0</strong>
        <em class="training-score__route">${u.name}</em>
      </div>
    </header>

    <div class="training-arena" id="hit-surface" role="button" tabindex="0" aria-label="点击或按空格出拳">
      <div class="arena-cage" aria-hidden="true">
        <span></span><span></span><span></span><span></span>
      </div>
      <div class="arena-light" aria-hidden="true"></div>
      <div class="arena-floor" aria-hidden="true">
        <span class="arena-floor__line arena-floor__line--a"></span>
        <span class="arena-floor__line arena-floor__line--b"></span>
        <span class="arena-floor__line arena-floor__line--c"></span>
      </div>

      <div class="arena-hud">
        <div class="arena-hud__label">轻松热身 · 20 秒</div>
        <div class="arena-hud__hint" id="arena-hint">
          <span>狂点屏幕出拳</span><em>SPACE / 单击都可以</em>
        </div>
      </div>

      <div class="combo-display" id="combo-display" aria-live="polite">
        <span>COMBO</span>
        <strong id="combo-count">0</strong>
        <em>x</em>
      </div>

      <div class="fighters">
        <div class="player-fighter" id="player-fighter">
          <div class="player-fighter__speedlines" aria-hidden="true">
            <span></span><span></span><span></span>
          </div>
          <div class="player-fighter__art" aria-hidden="true">
            ${d}
          </div>
          <span class="player-fighter__tag">YOU</span>
          <div class="player-fighter__glove" aria-hidden="true">
            <span class="glove-cuff"></span>
            <span class="glove-body"></span>
            <span class="glove-knuckles"></span>
          </div>
        </div>

        <div class="monster-wrap" id="monster-wrap">
          <div class="monster-label">
            <span class="monster-label__danger">!</span>
            <div>
              <strong>陪练小橙</strong>
              <span>你的热身搭档</span>
            </div>
          </div>
          <div class="monster-art" id="monster-art">
            <img src="/pixelfit/assets/char/training-buddy-v2.png" alt="陪练小橙" />
            <div class="monster-sweat" aria-hidden="true"></div>
          </div>
          <div class="monster-shadow" aria-hidden="true"></div>
          <div class="monster-wobble" aria-hidden="true"></div>
        </div>
      </div>

      <div class="hit-pad" aria-hidden="true">
        <div class="hit-pad__dumbbell">${X(`dumbbell`)}</div>
        <div class="hit-pad__copy">
          <strong>点这里出拳</strong>
          <span>连击越快，爽感越高</span>
        </div>
        <div class="hit-pad__burst">HIT!</div>
      </div>

      <div class="combo-banner" id="combo-banner">
        <span>COMBO</span>
        <strong id="combo-banner-count">10x</strong>
        <em id="combo-banner-copy">手感来了</em>
      </div>

      <div class="floating-layer" id="floating-layer" aria-hidden="true"></div>
      <div class="particle-layer" id="particle-layer" aria-hidden="true"></div>
      <div class="impact-flash" id="impact-flash" aria-hidden="true"></div>
      <div class="finish-flash" id="finish-flash" aria-hidden="true">
        <span class="finish-flash__ko">K.O.</span>
        <strong>热身完成！</strong>
        <em>正在结算今天的多巴胺...</em>
      </div>

      <div class="countdown-overlay" id="countdown-overlay">
        <div class="countdown-card">
          <span class="countdown-eyebrow">PUNCH IN 3... 2... 1...</span>
          <strong class="countdown-number" id="countdown-number">3</strong>
          <span class="countdown-label" id="countdown-label">把手机拿稳</span>
          <div class="countdown-controls">
            <span>点击屏幕</span><i>或按空格</i><span>和小橙练出好心情</span>
          </div>
          <p>不打断不扣体力 · 随时可以退出</p>
        </div>
      </div>
    </div>

    <div class="quit-overlay" id="quit-overlay" hidden>
      <div class="quit-card" role="dialog" aria-modal="true" aria-labelledby="quit-title">
        <span class="quit-card__eyebrow">WAIT, WHAT?</span>
        <div class="quit-card__art" aria-hidden="true">
          ${d}
          <span class="quit-card__sweat">!</span>
        </div>
        <h2 id="quit-title">这就要走？</h2>
        <p>现在退出没有奖励，也不会扣体力。<br/>休息好了，随时回来。</p>
        <div class="quit-card__actions">
          <button class="btn btn--primary" type="button" id="quit-continue">${X(`play`)} 继续练</button>
          <button class="btn btn--ghost" type="button" id="quit-confirm">确定退出</button>
        </div>
      </div>
    </div>
  `;let h=m.querySelector(`#hit-surface`),g=m.querySelector(`#timer-text`),_=m.querySelector(`#timer-ring`),x=m.querySelector(`#training-timer`),S=m.querySelector(`#hit-count`),C=m.querySelector(`#player-fighter`),T=m.querySelector(`#monster-wrap`),E=m.querySelector(`#monster-art`),D=m.querySelector(`#combo-display`),O=m.querySelector(`#combo-count`),k=m.querySelector(`#combo-banner`),A=m.querySelector(`#combo-banner-count`),ne=m.querySelector(`#combo-banner-copy`),j=m.querySelector(`#floating-layer`),re=m.querySelector(`#particle-layer`),M=m.querySelector(`#impact-flash`),N=m.querySelector(`#finish-flash`),P=m.querySelector(`#countdown-overlay`),F=m.querySelector(`#countdown-number`),I=m.querySelector(`#countdown-label`),ie=m.querySelector(`#quit-training`),L=m.querySelector(`#quit-overlay`),ae=m.querySelector(`#quit-continue`),oe=m.querySelector(`#quit-confirm`),se=m.querySelector(`#arena-hint`),R=`countdown`,z=f,B=0,V=0,ce=0,H=0,U=0,le=0,ue=0,W=0,G=0,K=!1,q=[],J=new Set,Y=(e,t)=>{let n=window.setTimeout(()=>{q.splice(q.indexOf(n),1),K||e()},t);return q.push(n),n},de=()=>{q.forEach(e=>window.clearTimeout(e)),q.length=0,J.forEach(e=>window.clearTimeout(e)),J.clear()},fe=(e,t,n=160)=>{if(!e)return;e.classList.remove(t),e.offsetWidth,e.classList.add(t);let r=window.setTimeout(()=>{J.delete(r),e.classList.remove(t)},n);J.add(r)},Z=()=>{let e=v(z/f,0,1);g&&(g.textContent=w(z)),_&&(_.style.strokeDashoffset=String(Re*(1-e)));let t=z<=5e3;x?.classList.toggle(`is-danger`,t),h?.classList.toggle(`is-final-stretch`,t&&R===`playing`)},pe=e=>{R=e;let t=e===`playing`;ie?.toggleAttribute(`disabled`,!t),h?.classList.toggle(`is-playing`,t),e===`paused`&&h?.classList.add(`is-paused`),e===`playing`&&h?.classList.remove(`is-paused`)},me=(e,t,n,r)=>{if(!j||!E)return;j.replaceChildren();let i=h?.getBoundingClientRect(),a=E.getBoundingClientRect();if(!i)return;let o=a.left-i.left+a.width*(.38+Math.random()*.28),s=a.top-i.top+a.height*(.3+Math.random()*.26),c=r?.x??o,l=r?.y??s,u=document.createElement(`span`);u.className=`floating-word floating-word--${t}`,n>=20&&t===`word`&&u.classList.add(`is-huge`),u.textContent=e,u.style.left=`${c}px`,u.style.top=`${l}px`,u.style.setProperty(`--drift-x`,`${b(-32,32)}px`),u.style.setProperty(`--drift-y`,`${b(-96,-64)}px`),u.style.setProperty(`--tilt`,`${b(-10,10)}deg`),j.appendChild(u);let d=window.setTimeout(()=>u.remove(),680);J.add(d)},he=(e=7)=>{if(!re||!E)return;for(;re.children.length>42;)re.firstElementChild?.remove();let t=h?.getBoundingClientRect(),n=E.getBoundingClientRect();if(!t)return;let r=n.left-t.left+n.width/2,i=n.top-t.top+n.height/2,a=[`var(--pk-yellow)`,`var(--pk-orange)`,`var(--pk-cyan)`,`var(--pk-cream)`];for(let t=0;t<e;t+=1){let e=document.createElement(`span`);e.className=`hit-particle`,e.style.left=`${r+b(-20,20)}px`,e.style.top=`${i+b(-16,16)}px`,e.style.setProperty(`--particle-color`,y(a)),e.style.setProperty(`--particle-x`,`${b(-120,120)}px`),e.style.setProperty(`--particle-y`,`${b(-130,70)}px`),e.style.setProperty(`--particle-size`,`${b(4,10)}px`),e.style.setProperty(`--particle-rotate`,`${b(-220,220)}deg`),re.appendChild(e),window.setTimeout(()=>e.remove(),620)}},ge=()=>{if(!re)return;let e=[`var(--pk-yellow)`,`var(--pk-orange)`,`var(--pk-cyan)`,`var(--pk-cream)`,`var(--pk-green)`];for(let t=0;t<28;t+=1){let t=document.createElement(`span`);t.className=`finish-confetti`,t.style.left=`${b(3,97)}%`,t.style.top=`${b(-8,22)}%`,t.style.setProperty(`--confetti-color`,y(e)),t.style.setProperty(`--confetti-delay`,`${Math.random()*.35}s`),t.style.setProperty(`--confetti-drift`,`${b(-80,80)}px`),t.style.setProperty(`--confetti-rotate`,`${b(180,720)}deg`),re.appendChild(t),window.setTimeout(()=>t.remove(),2e3)}},_e=()=>{O&&(O.textContent=String(H)),D?.classList.toggle(`is-visible`,H>=2),D?.classList.toggle(`is-hot`,H>=10),D?.classList.toggle(`is-blazing`,H>=25)},ve=()=>{let t=ee(le,l);if(A&&(A.textContent=`${H}x`),ne&&(ne.textContent=t),k){k.classList.remove(`is-visible`),k.offsetWidth,k.classList.add(`is-visible`);let e=window.setTimeout(()=>k.classList.remove(`is-visible`),900);J.add(e)}e.audio.comboMilestone(),te([10,35,18])},ye=t=>{if(R!==`playing`||K)return;let r=performance.now();ue&&r-ue<=p?H+=1:H=1,ue=r,ce+=1,U=Math.max(U,H),S&&(S.textContent=String(ce));let i=H>0&&H%n.training.milestoneStep===0;i&&(le+=1,ve()),e.audio.punch(H),te(H%5==0?16:6),fe(C,`is-punching`,170),fe(T,`is-hit`,170),fe(E,`is-squashed`,150),fe(M,`is-active`,120),fe(h,`is-shaking-${H>=20?3:H>=8?2:1}`,150);let a=Math.random(),o,s=`word`;a<.16?(o=`能量 +${b(1,4)}`,s=`damage`):a<.24&&H>=8?(o=`暴击!`,s=`crit`):o=y(c),(r-W>80||i)&&(me(o,s,H,t),W=r),he(H>=20?9:6);let l=m.querySelector(`.hit-pad`);fe(l,`is-tapped`,130),_e()},be=()=>{if(R===`finishing`||R===`done`)return;pe(`finishing`),z=0,Z(),se&&se.classList.add(`is-hidden`);let t=Date.now();N&&N.classList.add(`is-visible`),h?.classList.add(`is-finishing`),T?.classList.add(`is-launched`),C?.classList.add(`is-victorious`),E?.classList.add(`is-defeated`),D?.classList.remove(`is-visible`),ge(),e.audio.finisher(),Y(()=>e.audio.victory(),560),g&&(g.textContent=`0.0`),x&&x.classList.add(`is-complete`);let n={mode:`boxing`,hits:ce,maxCombo:U,durationSec:Math.round(f/1e3),milestones:le,startedAt:G,endedAt:t};Y(()=>{K||(R=`done`,e.onComplete(n))},2100)},xe=e=>{if(R!==`playing`||K)return;B||=e;let t=Math.min(110,Math.max(0,e-B));B=e,z=Math.max(0,z-t),Z(),z<=0?be():V=window.requestAnimationFrame(xe)},Q=()=>{K||(pe(`playing`),G=Date.now(),z=f,B=0,Z(),P?.classList.add(`is-out`),e.audio.startWhistle(),V=window.requestAnimationFrame(xe),ie?.focus({preventScroll:!0}),Y(()=>se?.classList.add(`is-dim`),4200))},$=()=>{K||(e.audio.countdown(!1),[{at:850,value:`2`,label:`手腕放松`},{at:1700,value:`1`,label:`准备出拳`},{at:2550,value:`开练!`,label:`把脂肪怪揍飞`,last:!0}].forEach(t=>{Y(()=>{F&&(F.textContent=t.value,F.classList.toggle(`is-go`,!!t.last)),I&&(I.textContent=t.label),e.audio.countdown(!!t.last)},t.at)}),Y(Q,3150))},Se=()=>{R===`playing`&&(pe(`paused`),window.cancelAnimationFrame(V),L&&(L.hidden=!1),Y(()=>ae?.focus({preventScroll:!0}),40))},Ce=()=>{R===`paused`&&(L&&(L.hidden=!0),pe(`playing`),B=0,V=window.requestAnimationFrame(xe))};h?.addEventListener(`pointerdown`,e=>{if(R!==`playing`)return;e.preventDefault();let t=h.getBoundingClientRect();ye({x:e.clientX-t.left,y:e.clientY-t.top})}),ie?.addEventListener(`click`,Se),ae?.addEventListener(`click`,Ce),oe?.addEventListener(`click`,()=>{R!==`done`&&(pe(`done`),Te(),e.onQuit())}),L?.addEventListener(`click`,e=>{e.target===L&&Ce()});let we=e=>{R===`playing`&&(e.code===`Space`||e.code===`Enter`)&&(e.preventDefault(),ye()),R===`paused`&&e.code===`Escape`&&(e.preventDefault(),Ce())};window.addEventListener(`keydown`,we);function Te(){K||(K=!0,V&&window.cancelAnimationFrame(V),de(),window.removeEventListener(`keydown`,we),document.removeEventListener(`visibilitychange`,Ee),m.replaceChildren())}let Ee=()=>{document.hidden&&R===`playing`&&Se()};return document.addEventListener(`visibilitychange`,Ee),g.textContent=w(f),_&&(_.style.strokeDashoffset=`0`),$(),{element:m,cleanup:Te}}var Be=`tray`,Ve=[`carb`,`protein`,`fiber`],He=[`remove`,`complete`,`shuffle`],Ue=[`给你机会你把握不住啊`,`三个同类才能消，你差一点`,`这盘食材，它不认识你`,`手速比营养先到极限`];function We(e){return`/pixelfit/assets/food-q/${e}-v2.png`}function Ge(e){let t=e.categories[0];if(!t)throw Error(`food item without category`);return t}function Ke(e){let t=[];for(let n=0;n<e;n+=1){let r=n*2.39996,i=35*Math.sqrt((n+.5)/e);t.push({x:50+Math.cos(r)*i,y:50+Math.sin(r)*i,rotate:Math.random()*90-45,dx:Math.random()*4-2,dy:Math.random()*4-2,z:n+1})}return t}function qe(e){let{audio:r,onComplete:i,onQuit:a}=e,o=n.diet,s=o.rewards,c=document.createElement(`div`);c.className=`screen diet-screen`,c.innerHTML=`
    <header class="diet-top">
      <button class="diet-pause" id="diet-pause" type="button" aria-label="暂停" disabled>
        <i></i><i></i>
      </button>
      <div class="diet-timer" id="diet-timer" aria-label="剩余时间">
        <span class="diet-timer__icon" aria-hidden="true">${X(`clock`)}</span>
        <strong id="diet-timer-text">${C(o.durationMs)}</strong>
      </div>
      <div class="diet-stats">
        <div class="diet-stat"><span>已完成</span><strong><b id="diet-hits">0</b> / ${o.targetHits} 套</strong></div>
        <div class="diet-stat"><span>最高连对</span><strong id="diet-max-combo">0</strong></div>
        <div class="diet-stat diet-stat--coin"><span>预计金币</span><strong id="diet-coins">+${Math.round(s.baseCoins)}</strong></div>
      </div>
    </header>

    <div class="diet-instruction">营养餐盘 <span>点食材入槽 · 同类三个消除</span></div>
    <section class="diet-board" aria-label="食材盘面">
      <div class="diet-board__plate" id="diet-board-plate"></div>
    </section>

    <p class="diet-tip">第一次遇到食材，停下来学一小口知识</p>

    <section class="diet-tray" id="diet-tray" data-drop-target="${Be}" aria-label="底盘托盘">
      ${Array.from({length:o.traySlots},(e,t)=>`<div class="diet-tray__slot" data-tray-slot="${t}"></div>`).join(``)}
    </section>

    <section class="diet-boosters" aria-label="道具">
      <button class="diet-booster" type="button" data-booster="remove">
        <span class="diet-booster__glyph" aria-hidden="true">↩️</span>
        <span class="diet-booster__label">移出</span>
        <span class="diet-booster__badge">1</span>
      </button>
      <button class="diet-booster" type="button" data-booster="complete">
        <span class="diet-booster__glyph" aria-hidden="true">🎯</span>
        <span class="diet-booster__label">凑齐</span>
        <span class="diet-booster__badge">1</span>
      </button>
      <button class="diet-booster" type="button" data-booster="shuffle">
        <span class="diet-booster__glyph" aria-hidden="true">🎲</span>
        <span class="diet-booster__label">打乱</span>
        <span class="diet-booster__badge">1</span>
      </button>
    </section>

    <div class="diet-float-layer" id="diet-float-layer" aria-hidden="true"></div>
    <div class="diet-combo-banner" id="diet-combo-banner" aria-live="polite">
      <span>COMBO</span>
      <strong id="diet-combo-banner-count">5x</strong>
      <em id="diet-combo-banner-copy">手感来了</em>
    </div>

    <div class="diet-countdown" id="diet-countdown">
      <div class="diet-countdown__card">
        <span class="eyebrow">营养餐盘 · 90 秒</span>
        <strong class="diet-countdown__number" id="diet-countdown-number">3</strong>
        <span class="diet-countdown__label" id="diet-countdown-label">点一点，凑齐三个同类</span>
        <p>碳水 / 蛋白质 / 膳食纤维 · 同分类三个自动消除</p>
      </div>
    </div>

    <div class="diet-win" id="diet-win" hidden>
      <div class="diet-win__card">
        <span class="eyebrow">TIME'S UP</span>
        <strong>营养餐盘，通关！</strong>
        <em>正在打包今天的营养课…</em>
      </div>
    </div>
  `;function u(e){if(!e)throw Error(`diet screen markup incomplete`);return e}let d=u(c.querySelector(`#diet-timer`)),f=u(c.querySelector(`#diet-timer-text`)),m=u(c.querySelector(`#diet-hits`)),g=u(c.querySelector(`#diet-max-combo`)),v=u(c.querySelector(`#diet-coins`)),b=u(c.querySelector(`#diet-board-plate`)),x=u(c.querySelector(`#diet-tray`)),S=Array.from(c.querySelectorAll(`.diet-tray__slot`)),w=u(c.querySelector(`#diet-pause`)),T=u(c.querySelector(`#diet-countdown`)),E=u(c.querySelector(`#diet-countdown-number`)),D=u(c.querySelector(`#diet-countdown-label`)),O=u(c.querySelector(`#diet-win`)),A=u(c.querySelector(`#diet-combo-banner`)),ne=u(c.querySelector(`#diet-combo-banner-count`)),j=u(c.querySelector(`#diet-combo-banner-copy`)),re=u(c.querySelector(`#diet-float-layer`)),M=new Map,N=new Map;for(let e of He){let t=u(c.querySelector(`[data-booster="${e}"]`)),n=u(t.querySelector(`.diet-booster__badge`));M.set(e,t),N.set(e,n)}let P=`countdown`,F=!1,I=!1,ie=0,L=0,ae=0,oe=0,se=0,z=!1,B=!1,V=null,ce=new Set,H=null,U=null,le=-1,ue={carb:0,protein:0,fiber:0},W=[],G=Array.from({length:o.traySlots},()=>null),K=new Map,q=[],J=[],Y=[],de={remove:o.boosters.freePerRound,complete:o.boosters.freePerRound,shuffle:o.boosters.freePerRound},fe=Ke(o.pouchSlots);function Z(e,t){let n=window.setTimeout(()=>{let t=q.indexOf(n);t>=0&&q.splice(t,1),F||e()},t);q.push(n)}function pe(){q.forEach(e=>window.clearTimeout(e)),q.length=0}function me(e){let t=fe[e];if(!t)throw Error(`board layout missing`);return t}function he(e,t){e.style.left=`${t.x}%`,e.style.top=`${t.y}%`,e.style.zIndex=String(t.z),e.style.transform=`translate(-50%, -50%) rotate(${t.rotate}deg) translate(${t.dx}px, ${t.dy}px)`}function ge(e,t){let n={instanceId:k(`food`),pouchIndex:e,item:t,category:Ge(t),node:document.createElement(`button`),layout:me(e),placed:!1};return n.node.className=`diet-food`,n.node.setAttribute(`type`,`button`),n.node.setAttribute(`aria-label`,`选择${t.name}`),n.node.addEventListener(`click`,e=>{e.detail===0&&Me(n)}),n.node.dataset.foodId=t.id,n.node.innerHTML=`
      <img class="diet-food__img" alt="" draggable="false" src="${We(_(t.id))}" />
      <span class="diet-food__glyph" aria-hidden="true">${t.glyph}</span>
      <span class="diet-food__name">${_(t.name)}</span>
    `,n.node.querySelector(`.diet-food__img`)?.addEventListener(`error`,()=>n.node.classList.add(`is-fallback`),{once:!0}),he(n.node,n.layout),n}function _e(){let e=h.filter(e=>o.foodIds.includes(e.id)),t=e=>W.filter(t=>!t.placed&&t.item.id===e.id).length,n=Math.min(...e.map(t));return y(e.filter(e=>t(e)===n))}function ve(e){K.set(e.instanceId,ze.bind(e.node,{key:e.instanceId,data:e.item}))}function be(e){K.get(e.instanceId)?.(),K.delete(e.instanceId)}function xe(e){let t=W[e];if(!t)return;be(t),t.node.remove();let n=ge(e,_e());W[e]=n,n.node.classList.add(`is-new`),Z(()=>n.node.classList.remove(`is-new`),380),b.append(n.node),ve(n)}function Q(e,t){let n=S[e];if(!n)return;let r=document.createElement(`img`);r.src=We(t.item.id),r.alt=t.item.name,r.draggable=!1,r.className=`diet-tray__food`,n.replaceChildren(r),n.dataset.slotFood=t.item.id,n.dataset.slotCategory=t.category}function $(e){let t=S[e];t&&(t.replaceChildren(),t.classList.remove(`is-clearing`),delete t.dataset.slotFood,delete t.dataset.slotCategory)}function Se(){return Math.round(s.baseCoins+s.coinsPerItem*ie+s.coinsPerCombo*ae)}function Ce(){m.textContent=String(ie),g.textContent=String(ae),v.textContent=`+${Se()}`}function we(){let e=ct.remainingMs(),t=C(e);f.textContent!==t&&(f.textContent=t);let n=P===`playing`,i=n&&e<=o.tickBelowMs;if(d.classList.toggle(`is-danger`,i),i&&!ct.isPaused()){let t=Math.ceil(e/1e3);t!==le&&(le=t,r.tick())}let a=n&&ct.isPaused();d.classList.toggle(`is-paused`,a),c.classList.toggle(`is-paused`,a)}function Ee(){let e=G.filter(e=>e!==null).length,t=o.traySlots-e<=o.trayWarnAt;t&&!z&&r.trayWarn(),z=t,x.classList.toggle(`is-warn`,t)}function Ae(){let e=G.filter(e=>e!==null);for(let t=0;t<G.length;t+=1){let n=e[t]??null;G[t]=n,$(t),n&&Q(t,n)}Ee()}function je(e){B=e,ze.setLocked(e),w.disabled=e||P!==`playing`,c.classList.toggle(`is-busy`,e);for(let t of M.values())t.disabled=e}async function Me(e){if(!(F||P!==`playing`||B||ct.isPaused()||e.placed)){if(je(!0),r.pick(),!ce.has(e.item.id)){ct.pause();let t=De({title:`${e.item.name} · ${p[e.category].label}`,body:e.item.science,imageUrl:We(e.item.id),tag:`营养小课堂 · 计时已暂停`,confirmLabel:`学到了，继续游戏`});if(V=t,await t.closed,V=null,F||P!==`playing`)return;ce.add(e.item.id),ct.resume()}Ye(e)}}function Ne(e,t,n=200){e&&(e.classList.remove(t),e.offsetWidth,e.classList.add(t),Z(()=>e.classList.remove(t),n))}function Pe(){ne.textContent=`${L}x`,j.textContent=ee(oe,l),Ne(A,`is-visible`,950)}function Fe(e){let t=document.createElement(`span`);t.className=`diet-hint`,t.textContent=e,re.append(t),Z(()=>t.remove(),1400)}function Ie(e){if(F||P!==`playing`||e.placed)return;let t=G.findIndex(e=>e===null);if(t<0){r.reject(),Ne(x,`is-reject`,420);return}let n={instanceId:e.instanceId,pouchIndex:e.pouchIndex,item:e.item,category:e.category};G[t]=n,e.placed=!0,be(e),e.node.classList.add(`is-placed`),Q(t,n),r.drop(),te(8),Ee(),Le(n)}function Le(e){let t=[];for(let n=0;n<G.length;n+=1){let r=G[n];r&&r.category===e.category&&t.push(n)}if(t.length<o.clearThreshold){je(!1);return}let n=t.slice(0,o.clearThreshold),i=[];for(let e of n){let t=G[e];t&&(i.push(t),G[e]=null);let n=S[e];n&&n.classList.add(`is-clearing`)}L+=1,ie+=1,ae=Math.max(ae,L),ue[e.category]=(ue[e.category]??0)+1,L%5==0&&(oe+=1,Pe(),r.comboMilestone(),te([10,35,18])),r.clear(),r.streak(L),Ce(),Z(()=>{for(let e of n)$(e);for(let e of i)xe(e.pouchIndex);Ae(),je(!1)},520)}function Re(e,t){if(P!==`playing`||F)return;let n=W.find(t=>!t.placed&&t.instanceId===e.key);n&&(t===Be?Me(n):r.tap())}let ze=Te({onDragStart:()=>r.pick(),onDrop:(e,t)=>Re(e,t),onTap:e=>{let t=W.find(t=>t.instanceId===e.key);t&&Me(t)}});function qe(e){let t=G[e];if(!t)return;G[e]=null,$(e),r.booster();let n=W[t.pouchIndex];n&&(n.placed=!1,n.node.classList.remove(`is-placed`),ve(n),Ae())}function Je(){for(let e of Ve)if(G.filter(t=>t!==null&&t.category===e).length===o.clearThreshold-1)return e;return null}function Ye(e){let t=G.findIndex(e=>e===null),n=t>=0?S[t]:void 0;if(!n){r.reject(),je(!1);return}e.node.classList.add(`is-flying`);let i=e.node.getBoundingClientRect(),a=n.getBoundingClientRect(),o=i.left+i.width/2,s=i.top+i.height/2,c=a.left+a.width/2,l=a.top+a.height/2,u=document.createElement(`img`);u.src=We(e.item.id),u.alt=``,u.draggable=!1,u.className=`diet-fly`,u.style.left=`${o}px`,u.style.top=`${s}px`,u.style.width=`${i.width}px`,u.style.transform=`translate(-50%, -50%) scale(1)`,document.body.append(u),Y.push(u);let d=u.animate([{transform:`translate(-50%, -50%) scale(1) rotate(0deg)`},{transform:`translate(-50%, -50%) translate(${c-o}px, ${l-s}px) scale(0.5) rotate(10deg)`}],{duration:matchMedia(`(prefers-reduced-motion: reduce)`).matches?1:360,easing:`cubic-bezier(0.3, 0.7, 0.3, 1)`});J.push(d),d.onfinish=()=>{u.remove(),Y=Y.filter(e=>e!==u),!(F||P!==`playing`)&&(e.node.classList.remove(`is-flying`),Ie(e))}}function Xe(t){let n=N.get(t),r=M.get(t);if(!n||!r)return;let i=de[t],a=i<=0&&e.save.progress.coins<o.boosters.coinCost;n.classList.toggle(`is-coin`,i<=0),n.innerHTML=i>0?String(i):X(`coin`),r.classList.toggle(`is-broke`,a)}function Ze(t){let n=de[t];return n>0?(de[t]=n-1,Xe(t),!0):e.save.progress.coins>=o.boosters.coinCost&&(e.save.progress.coins-=o.boosters.coinCost,R(e.save),Xe(t),!0)}function Qe(e){r.reject();let t=M.get(e);t&&Ne(t,`is-reject`,420)}function $e(e){if(P!==`playing`||F||B||ct.isPaused())return;if(e===`remove`){let e=G.findIndex(e=>e!==null);if(e<0){Qe(`remove`),Fe(`托盘还是空的`);return}if(!Ze(`remove`)){Qe(`remove`);return}qe(e);return}if(e===`complete`){let e=Je(),t=W.find(t=>!t.placed&&t.category===e);if(!e||!t){Qe(`complete`),Fe(`盘面凑不出三连`);return}if(!Ze(`complete`)){Qe(`complete`);return}Me(t);return}let t=W.filter(e=>!e.placed);if(t.length<2||!Ze(`shuffle`)){Qe(`shuffle`);return}r.shuffle();let n=t.map(e=>e.layout);for(let e=n.length-1;e>0;--e){let t=Math.floor(Math.random()*(e+1)),r=n[e],i=n[t];r&&i&&(n[e]=i,n[t]=r)}t.forEach((e,t)=>{let r=n[t];r&&(e.layout=r,he(e.node,r))})}for(let e of He)M.get(e)?.addEventListener(`click`,()=>$e(e));function et(){F||(P=`playing`,se=Date.now(),ct.start(),r.startWhistle(),ze.setLocked(!1),w.disabled=!1,T.classList.add(`is-out`),Z(()=>T.remove(),420),we(),Ce())}function tt(){E.textContent=`3`,D.textContent=`点一点，凑齐三个同类`,r.countdown(!1),Z(()=>{E.textContent=`2`,r.countdown(!1)},1e3),Z(()=>{E.textContent=`1`,E.classList.add(`is-go`),r.countdown(!0)},2e3),Z(et,o.countdownMs)}function nt(){if(P!==`finished`){if(P=`finished`,ze.setLocked(!0),w.disabled=!0,d.classList.remove(`is-danger`,`is-paused`),c.classList.remove(`is-paused`),f.textContent=C(0),ie>=o.targetHits)O.hidden=!1,r.victory(),Z(()=>rt(),1100);else{let n=t[e.save.profile?.characterId??`ali`]??`char-male-strong`,i=ke({variant:`fail`,ribbonText:`失败`,caption:y(Ue),photoHTML:`<img src="/pixelfit/assets/char/${n}.png" alt="">`});i.element.id=`diet-fail`,U=i,i.result.then(()=>rt()),r.fail()}}}function rt(){if(I||F)return;I=!0,U?.close(),U=null;let e={mode:`diet`,hits:ie,maxCombo:ae,durationSec:Math.round(o.durationMs/1e3),milestones:oe,correctByCategory:{...ue},startedAt:se,endedAt:Date.now()};i(e)}function it(){if(P!==`playing`||F||H||B)return;ct.pause(),ze.setLocked(!0);let e=Oe({title:`暂停`,tone:`orange`,content:`<p>计时已暂停，回来继续凑三连。</p><button class="pk-btn pk-btn--orange" type="button" id="diet-quit">退出本局</button>`,confirmText:`继续`});H=e,e.result.then(()=>at()),e.element.querySelector(`#diet-quit`)?.addEventListener(`click`,()=>{e.close(),ot()})}function at(){H&&(H=null,!(P!==`playing`||F)&&(ze.setLocked(!1),ct.isFinished()||ct.resume()))}function ot(){P===`finished`||F||(P=`finished`,lt(),a())}let st=e=>{e.key===`Escape`&&P===`finished`&&U&&rt()},ct=ye({durationMs:o.durationMs,tickMs:100,onTick:()=>we(),onFinish:()=>nt()});w.addEventListener(`click`,it),window.addEventListener(`keydown`,st);function lt(){if(!F){F=!0,V?.close(),V=null,pe(),H?.close(),H=null,U?.close(),U=null;for(let e of J)e.cancel();J.length=0;for(let e of Y)e.remove();Y=[],window.removeEventListener(`keydown`,st),ct.stop(),ze.destroy(),c.replaceChildren()}}for(let e=0;e<o.pouchSlots;e+=1){let t=ge(e,_e());W.push(t),b.append(t.node),ve(t)}ze.setLocked(!0),w.disabled=!0;for(let e of He)Xe(e);return Ce(),we(),tt(),{element:c,cleanup:lt}}var Je=2*Math.PI*52;function Ye(e){let{save:r,audio:i}=e,o=n.stamina.max,s=r.profile?a[r.profile.characterId]:a.ali,c=!1,l=!1,u=null,d=0,f=``,p=document.createElement(`div`);p.className=`screen screen--sleep`,p.innerHTML=`
    <div class="sleep-bg" aria-hidden="true">
      <span class="sleep-bg__moon"></span>
      <span class="sleep-bg__star sleep-bg__star--a"></span>
      <span class="sleep-bg__star sleep-bg__star--b"></span>
      <span class="sleep-bg__star sleep-bg__star--c"></span>
      <span class="sleep-bg__grid"></span>
    </div>

    <header class="sleep-top">
      <button class="sleep-close" type="button" id="sleep-close" aria-label="关闭睡眠舱">
        ${X(`close`)}
      </button>
      <div class="sleep-top__title">
        <span class="eyebrow">SLEEP STATION</span>
        <h1>睡眠舱</h1>
      </div>
      <span class="sleep-top__stamp" aria-hidden="true">Zzz</span>
    </header>

    <div class="sleep-scroll">
      <section class="sleep-stamina" aria-label="体力状态">
        <div class="sleep-stamina__head">
          <span class="sleep-stamina__label">${X(`bolt`)} 当前体力</span>
          <span class="sleep-stamina__next">
            ${X(`clock`)} <span id="sleep-next-text">距下一点体力 <strong>--:--</strong></span>
          </span>
        </div>
        <div class="sleep-stamina__row">
          <strong class="sleep-stamina__value"><em id="sleep-stamina-now">0</em><i>/ ${o}</i></strong>
          <div class="sleep-pips" id="sleep-pips" aria-hidden="true">
            ${Array.from({length:o},()=>`<span class="sleep-pip"></span>`).join(``)}
          </div>
        </div>
      </section>

      <section class="sleep-rest" aria-label="休息区">
        <div class="sleep-bed" aria-hidden="true">
          <span class="sleep-bed__frame"></span>
          <span class="sleep-pillow"></span>
          <div class="sleep-character">
            <img class="sleep-character__img" src="/pixelfit/assets/char/${t[s.id]??`char-male-strong`}.png" alt="">
          </div>
          <span class="sleep-blanket"></span>
          <span class="sleep-z sleep-z--a">Z</span>
          <span class="sleep-z sleep-z--b">z</span>
          <span class="sleep-z sleep-z--c">z</span>
        </div>
        <div class="sleep-ring" aria-hidden="true">
          <svg viewBox="0 0 120 120">
            <circle class="sleep-ring__track" cx="60" cy="60" r="52"></circle>
            <circle class="sleep-ring__fill" id="sleep-ring-fill" cx="60" cy="60" r="52"></circle>
          </svg>
          <div class="sleep-ring__center">
            <strong>休息中</strong>
            <span id="sleep-ring-sub">0%</span>
          </div>
        </div>
      </section>

      <section class="sleep-actions" aria-label="睡眠操作">
        <button class="pk-btn pk-btn--green sleep-main" type="button" id="sleep-main">
          <span class="sleep-main__icon">${X(`bolt`)}</span>
          <span class="sleep-main__copy">
            <strong id="sleep-main-label">睡觉</strong>
            <small id="sleep-main-sub">进入休息状态，躺着等体力</small>
          </span>
        </button>
        <button class="pk-btn pk-btn--orange sleep-ad" type="button" id="sleep-ad">
          <span class="sleep-ad__tv">${X(`tv`)}</span>
          <span class="sleep-ad__copy">
            <strong>看广告 · 多睡 ${n.sleep.adHours} 小时</strong>
            <small id="sleep-ad-note">免费 · ${Math.ceil(n.ad.durationMs/1e3)} 秒模拟广告</small>
          </span>
          <span class="sleep-ad__time">${Math.ceil(n.ad.durationMs/1e3)}s</span>
        </button>
        <button class="pk-btn sleep-coin" type="button" id="sleep-coin">
          <span class="sleep-coin__icon">${X(`coin`)}</span>
          <span class="sleep-coin__copy">
            <strong>花金币睡满</strong>
            <small id="sleep-coin-note"></small>
          </span>
          <span class="sleep-coin__price" id="sleep-coin-price">—</span>
        </button>
      </section>

      <p class="sleep-note">
        ${X(`clock`)} 每 ${Math.round(n.stamina.regenMs/6e4)} 分钟自动回 1 点体力 ·
        睡觉只是躺着等，广告与金币是加速，不影响自然恢复
      </p>
    </div>
  `;let m=p.querySelector(`#sleep-next-text`),h=p.querySelector(`#sleep-stamina-now`),g=Array.from(p.querySelectorAll(`.sleep-pip`)),_=p.querySelector(`#sleep-ring-fill`),y=p.querySelector(`#sleep-ring-sub`),b=p.querySelector(`#sleep-main`),S=p.querySelector(`#sleep-main-label`),w=p.querySelector(`#sleep-main-sub`),T=p.querySelector(`#sleep-close`),E=p.querySelector(`#sleep-ad`),D=p.querySelector(`#sleep-ad-note`),O=p.querySelector(`#sleep-coin`),k=p.querySelector(`#sleep-coin-note`),A=p.querySelector(`#sleep-coin-price`);_?.style.setProperty(`stroke-dasharray`,String(Je)),_?.style.setProperty(`stroke-dashoffset`,String(Je));let ee=()=>{let e=r.progress.stamina,t=e>=o,i=Math.max(0,o-e)*n.sleep.coinPerPoint,a=Math.max(0,i-r.progress.coins),s=r.progress.coins>=i;E&&(E.disabled=t),D&&(D.textContent=t?`体力已经满了`:`免费 · ${Math.ceil(n.ad.durationMs/1e3)} 秒模拟广告`,D.dataset.state=t?`warn`:`ok`),O&&(O.disabled=t||!s),k&&(k.textContent=t?`体力已经满了`:s?`${x(i)} 金币 · 直接回满`:`还差 ${x(a)} 金币`,k.dataset.state=t||!s?`warn`:`ok`),A&&(A.textContent=t?`—`:x(i))},te=()=>{let t=V(r),i=U(r),a=r.progress.stamina;h&&(h.textContent=String(a));let o=i.full?`体力已回满`:`距下一点体力 <strong>${C(i.nextInMs)}</strong>`;m&&o!==f&&(f=o,m.innerHTML=o),g.forEach((e,t)=>e.classList.toggle(`is-on`,t<a));let s=i.full?1:v(1-i.nextInMs/n.stamina.regenMs,0,1);_&&_.style.setProperty(`stroke-dashoffset`,String(Je*(1-s))),y&&(y.textContent=i.full?`体力已满`:`${Math.round(s*100)}%`),ee(),t&&e.persist()},ne=e=>{c=e,p.classList.toggle(`is-resting`,c),S&&(S.textContent=c?`起床`:`睡觉`),w&&(w.textContent=c?`休息结束，起来接着练`:`进入休息状态，躺着等体力`),te()};return T?.addEventListener(`click`,()=>{l||(i.tap(),e.onClose())}),b?.addEventListener(`click`,()=>{l||(i.tap(),ne(!c))}),E?.addEventListener(`click`,()=>{l||u||(V(r),!(r.progress.stamina>=o)&&(i.tap(),u=Z({host:p,audio:i,variant:`stamina`,rewardText:`多睡 2 小时`,rewardSticker:`2H`,onRewarded:()=>{u=null;let t=Math.floor(n.sleep.adHours*36e5/n.stamina.regenMs),i=ce(r,t);e.persist(),e.toast(`多睡 2 小时，体力 +${i}。`,`success`),te()},onCancelled:()=>{u=null,i.error(),e.toast(`广告没看完，这 2 小时没睡成。`,`warn`)}})))}),O?.addEventListener(`click`,()=>{if(l)return;V(r);let t=o-r.progress.stamina;if(t<=0)return;let a=t*n.sleep.coinPerPoint;r.progress.coins<a?(i.error(),e.toast(`还差 ${x(a-r.progress.coins)} 金币，先去练两把。`,`warn`)):(i.tap(),r.progress.coins-=a,ce(r,t),i.reward(),e.toast(`睡饱了，可以开练了`,`success`),e.persist(),te())}),te(),d=window.setInterval(te,n.sleep.ringTickMs),{element:p,cleanup(){l=!0,window.clearInterval(d),u?.(),u=null,p.replaceChildren()}}}var Xe=[`今天这波，肌肉记仇了`,`碳水归位，蛋白就位`,`又完成一局，给自己点个赞`,`自律的人，先赢一半`],Ze=[`给你机会你把握不住啊`,`手速比营养先到极限`,`这局算热身，下局算数`,`休息一下，我们下局再来`];function Qe(e){let{save:r,outcome:i}=e,a=r.profile;if(!a)throw Error(`Result screen requires a profile`);let o=q(r,i,1),s=i.mode===`diet`?i.hits>=n.diet.targetHits:i.hits>=1,c=s?`通关成功`:`失败`,l=s?`win`:`fail`,u=y(s?Xe:Ze),d=t[a.characterId],f=null,p=!1,m=!1,h=null,g=null,_=document.createElement(`div`);_.className=`screen screen--result`;let v=()=>{_.innerHTML=`
      <div class="pk-polaroid pk-result pk-result--${l}">
        <div class="pk-polaroid__ribbon pk-polaroid__ribbon--${l}">${c}</div>
        <div class="pk-polaroid__card">
          <span class="pk-polaroid__pin" aria-hidden="true"></span>
          <div class="pk-polaroid__photo pk-result__photo">
            <img src="/pixelfit/assets/char/${d}.png" alt="角色贴图" />
          </div>
          <p class="pk-polaroid__caption">${u}</p>
          <p class="pk-result__stats">正确 ${i.hits} · 最高连对 ${i.maxCombo} · +${o.xp}XP / +${o.coins} 金币</p>
        </div>
        <div class="pk-polaroid__actions pk-result__actions">
          <button class="pk-btn pk-btn--orange" type="button" id="claim-direct">领取奖励</button>
          <button class="pk-btn pk-btn--green" type="button" id="claim-ad">看广告领双倍</button>
          <div class="pk-result__mini">
            <button class="pk-btn pk-result__mini-btn" type="button" id="share-now">生成打卡卡</button>
            <button class="pk-btn pk-result__mini-btn" type="button" id="go-home">回首页</button>
          </div>
        </div>
      </div>
    `},b=t=>{e.audio.reward(),t.leveledUp&&window.setTimeout(()=>e.audio.levelUp(),240)},x=e=>{f=e,_.classList.add(`is-claimed`);let t=_.querySelector(`.pk-result__actions`);t&&(t.innerHTML=`
      <div class="pk-result__claimed">
        <strong>奖励已到账${e.doubled?` · 双倍`:``}</strong>
        <span>+${e.xp} XP · +${e.coins} 金币${e.leveledUp?` · 升到 LV.${e.levelAfter}`:``}</span>
      </div>
      <div class="pk-result__mini">
        <button class="pk-btn pk-result__mini-btn" type="button" id="share-now">生成打卡卡</button>
        <button class="pk-btn pk-result__mini-btn" type="button" id="go-home">回首页</button>
      </div>
    `,window.setTimeout(()=>{_.querySelector(`#share-now`)?.focus({preventScroll:!0})},80))},S=e=>{_.querySelectorAll(`#claim-direct, #claim-ad`).forEach(t=>{t.disabled=e})},C=async t=>{if(p||f||(p=!0,S(!0),await new Promise(e=>window.setTimeout(e,280)),m))return null;let n=e.claim(t);return n?(b(n),x(n),n):(p=!1,S(!1),e.toast(`体力不足，奖励没有结算成功。`,`warn`),null)},w=e=>{if(g)return;let t=C(e);g=t,t.finally(()=>{g===t&&(g=null)})},T=async()=>{if(f){e.audio.tap(),e.openShare(f.record);return}let t=g;if(t){let n=await t;if(n){e.audio.tap(),e.openShare(n.record);return}}e.audio.tap(),e.toast(`先领取奖励，再生成打卡卡。`,`default`)},E=()=>{p=!0,S(!0),h=Z({host:_,audio:e.audio,variant:`double`,onRewarded:()=>{h=null,p=!1,w(2)},onCancelled:()=>{h=null,p=!1,S(!1),e.toast(`广告关掉了，直接领取也很香。`,`default`)}})};return _.addEventListener(`click`,t=>{let n=t.target?.closest?.(`button`);if(n&&_.contains(n))switch(n.id){case`claim-direct`:w(1);break;case`claim-ad`:E();break;case`share-now`:T();break;case`go-home`:e.audio.tap(),e.goHome()}}),v(),{element:_,cleanup(){m=!0,h?.(),h=null,_.replaceChildren()}}}var $e=1600,et={boxing:`轻松热身`,diet:`营养三消`,conveyor:`器械训练`},tt={boxing:`拳`,diet:`套`,conveyor:`件`};function nt(e){e.beginPath(),e.moveTo(0,14);for(let t=0;t<720;t+=24)e.lineTo(t+12,0),e.lineTo(t+24,14);e.lineTo(720,1586);for(let t=720;t>0;t-=24)e.lineTo(t-12,$e),e.lineTo(t-24,1586);e.closePath()}function rt(e,t){let n=2166136261;for(let e of t)n=Math.imul(n^e.charCodeAt(0),16777619);let r=240;for(;r<480;){n=Math.imul(n^n>>>13,2246822507);let t=2+Math.abs(n)%4;(n>>>8)%2==0&&e.fillRect(r,1410,t,56),r+=t+3}}async function it(e){let{record:n}=e,r=n.mode??`boxing`,i=a[n.characterId]??a.ali,s=o[n.route]??o.bulk,c=new Image;c.src=`/pixelfit/assets/char/${t[i.id]}.png`,await c.decode(),await document.fonts.ready;let l=document.createElement(`canvas`);l.width=720,l.height=$e;let u=l.getContext(`2d`);if(!u)throw Error(`Canvas 2D is unavailable`);let d=getComputedStyle(document.documentElement),f=e=>d.getPropertyValue(`--pk-receipt-${e}`).trim(),p=f(`ink`),m=f(`muted`),h=f(`line`),g=(e,t,n,r,i=400,a=`left`,o=p,s=624)=>{u.fillStyle=o,u.textAlign=a,u.font=`${i} ${r}px "Microsoft YaHei", "PingFang SC", sans-serif`,u.fillText(e,t,n,s)},_=e=>{u.strokeStyle=h,u.lineWidth=1,u.beginPath(),u.moveTo(48,e),u.lineTo(672,e),u.stroke()},v=(e,t,n)=>{g(e,48,n,25,400,`left`,m),g(t,672,n,27,600,`right`,p,420)};nt(u),u.clip(),u.fillStyle=f(`paper`),u.fillRect(0,0,720,$e),g(`PixelFit 成长小票`,360,106,49,800,`center`),g(`D A I L Y   G R O W T H   R E C E I P T`,360,153,16,400,`center`,m),_(186),g(`DATE  ${D(n.completedAt)}`,48,222,20,400,`left`,m),g(`NO. PF-${n.id.replace(/[^a-zA-Z0-9]/g,``).slice(-6).toUpperCase()}`,672,222,20,400,`right`,m),g(`今日的我`,360,287,32,700,`center`);let y=Math.min(544/c.naturalWidth,520/c.naturalHeight),b=c.naturalWidth*y,x=c.naturalHeight*y;return u.drawImage(c,(720-b)/2,315+(520-x)/2,b,x),g(n.nickname,360,868,32,700,`center`,p,580),u.fillStyle=f(`tag`),u.beginPath(),u.roundRect(150,890,420,44,22),u.fill(),g(`${et[r]}  ·  ${s.name}  ·  Lv.${n.level}`,360,919,22,400,`center`,p,390),_(962),g(`本次成长`,48,1005,25,600,`left`,m),g(`认真玩过的一局，也值得留下。`,48,1047,27),g(`+${n.xp} XP`,48,1100,38,700),g(`+${n.coins} 金币`,672,1100,34,700,`right`),_(1130),g(`训练记录`,48,1174,25,600,`left`,m),v(`游戏时长`,`${String(Math.floor(n.durationSec/60)).padStart(2,`0`)}:${String(n.durationSec%60).padStart(2,`0`)}`,1220),v(r===`diet`?`营养消除`:r===`conveyor`?`挑对器械`:`热身出拳`,`${n.hits} ${tt[r]}`,1264),v(`最高连对`,`${n.maxCombo}`,1308),v(`连续打卡`,`${e.streakDays} 天`,1352),u.fillStyle=p,rt(u,n.id),g(`T H A N K S   F O R   S H O W I N G   U P`,360,1504,16,400,`center`,m),g(`游戏成长记录 · 不代表真实身体测量`,360,1542,18,400,`center`,m),l.toDataURL(`image/png`)}function at(e){let t=String(e.id??`pxf`).replace(/[^a-zA-Z0-9_-]/g,``).slice(-6)||`pxf`;return`PixelFit_Receipt_${D(e.completedAt).replace(/\./g,``)}_${t}.png`}function ot(e){let{save:t,record:n}=e,r=Y(n),i=null,a=null,o=!1,s=!1,c=document.createElement(`div`);c.className=`screen screen--share ${e.mode===`new`?`is-new`:``}`,c.innerHTML=`
    <header class="share-top">
      <button class="share-close" type="button" id="share-back" aria-label="回到健身房">${X(`close`)}</button>
      <div><h1>成长小票已生成</h1><p>留下今天的每一点进步</p></div>
    </header>
    <div class="share-scroll">
      <div class="share-stage">
        <div class="share-card-frame" id="share-card-frame">
          <div class="share-loading" id="share-loading" role="status">
            ${X(`file`)}<strong>正在打印成长小票…</strong>
            <span>把今天的努力，留在这一张纸上</span>
          </div>
          <img class="share-card-image" id="share-card-image" alt="PixelFit 成长小票：角色、游戏时长、成绩和奖励" hidden />
        </div>
        <footer class="share-dock">
          <button class="receipt-button" type="button" id="share-card" disabled>${X(`share`)} 分享成长小票</button>
          <div class="share-secondary">
            <button class="receipt-link" type="button" id="save-card" disabled>${X(`download`)} 保存图片</button>
            <button class="receipt-link" type="button" id="copy-caption" disabled>${X(`copy`)} 复制文案</button>
            <button class="receipt-link" type="button" id="go-home">${X(`home`)} 回首页</button>
          </div>
          <p class="share-dock__note">支持长按存图 · 保存后可自行发布朋友圈</p>
          <p class="share-caption" id="share-caption" hidden></p>
        </footer>
      </div>
    </div>
  `;let l=c.querySelector(`#share-card-image`),u=c.querySelector(`#share-loading`),d=c.querySelector(`#save-card`),f=c.querySelector(`#share-card`),p=c.querySelector(`#copy-caption`),m=async()=>{u.classList.remove(`is-done`),u.innerHTML=`${X(`file`)}<strong>正在打印成长小票…</strong><span>把今天的努力，留在这一张纸上</span>`;try{let e=await it({record:n,streakDays:t.stats.streakDays,totalWorkouts:Math.max(t.stats.totalWorkouts,1),totalHits:t.stats.totalHits}),r=await(await fetch(e)).blob();if(o||(i=e,a=new File([r],at(n),{type:`image/png`}),l.src=e,await l.decode(),o))return;l.hidden=!1,l.width=720,l.height=$e,u.classList.add(`is-done`),c.querySelector(`#share-card-frame`)?.classList.add(`is-ready`),c.classList.add(`is-ready`);for(let e of[d,f,p])e.disabled=!1}catch(t){if(o)return;console.error(`[share] 小票生成失败：`,t),u.innerHTML=`<strong>小票暂时没印出来</strong><button type="button" class="receipt-button" id="share-retry">重新生成</button>`,u.querySelector(`#share-retry`)?.addEventListener(`click`,()=>void m()),e.toast(`生成失败，可以重试。`,`warn`)}},h=(t=`已请求保存图片；手机也可长按小票保存。`)=>{if(!i)return;let r=document.createElement(`a`);r.href=i,r.download=at(n),document.body.appendChild(r),r.click(),r.remove(),e.audio.coin(),e.toast(t,`success`)};f.addEventListener(`click`,async()=>{if(!s&&a){if(!navigator.canShare?.({files:[a]}))h(`此浏览器不支持图片分享，已请求保存图片。`);else{s=!0,f.disabled=!0;try{await navigator.share({files:[a],title:`我的 PixelFit 成长小票`,text:r})}catch(t){!o&&!(t instanceof DOMException&&t.name===`AbortError`)&&e.toast(`分享未完成，请用保存图片。`,`warn`)}finally{s=!1,o||(f.disabled=!1)}}}}),d.addEventListener(`click`,()=>h()),p.addEventListener(`click`,async()=>{let t=await A(r);if(!o){if(t)e.toast(`文案已复制。`,`success`);else{let t=c.querySelector(`#share-caption`);t.textContent=r,t.hidden=!1,e.toast(`请长按下方文案复制。`)}}});for(let t of[`go-home`,`share-back`])c.querySelector(`#`+t)?.addEventListener(`click`,()=>{e.audio.tap(),e.goHome()});return m(),{element:c,cleanup(){o=!0,c.replaceChildren()}}}var st=class{save;audio;screenHost;modalHost;toastHost;currentScreen=null;currentScreenName=null;activeSheet=null;pendingOutcome=null;escapeHandler=null;constructor(){this.save=se(),this.audio=new e(this.save.settings.sound);let t=document.querySelector(`#screen-host`),n=document.querySelector(`#modal-host`),r=document.querySelector(`#toast-host`);if(!t||!n||!r)throw Error(`PixelFit root nodes are missing`);this.screenHost=t,this.modalHost=n,this.toastHost=r}start(){let e=()=>{this.audio.unlock()};document.addEventListener(`pointerdown`,e,{passive:!0}),document.addEventListener(`keydown`,e,{once:!0}),this.save.profile?this.showHome():this.showOnboarding()}switchScreen(e,t){this.closeSheet(),this.toastHost.replaceChildren(),this.currentScreen?.cleanup(),this.currentScreen=t,this.currentScreenName=e,this.screenHost.replaceChildren(t.element),document.body.dataset.screen=e}persist(){R(this.save)}showOnboarding(){let e=pe({audio:this.audio,complete:e=>this.completeOnboarding(e)});this.switchScreen(`onboarding`,e)}completeOnboarding(e){let t=Date.now(),n={nickname:e.nickname.trim().slice(0,10)||`健身搭子`,characterId:e.characterId,route:e.route,createdAt:t};this.save.profile=n,R(this.save,t),this.showHome()}showHome(){V(this.save),R(this.save);let e=ve({save:this.save,audio:this.audio,startTraining:()=>this.startTraining(),startDiet:()=>this.startDiet(),startSleep:()=>this.startSleep(),startWarmup:()=>this.startWarmup(),openReserved:e=>this.openReserved(e),openShare:e=>this.showShare(e,`history`),openEnergySheet:()=>this.openEnergySheet(),toggleSound:()=>this.toggleSound(),persist:()=>this.persist(),toast:(e,t)=>this.toast(e,t)});this.switchScreen(`home`,e)}startTraining(){if(!this.save.profile){this.showOnboarding();return}if(V(this.save),this.save.progress.stamina<n.training.staminaCost){this.toast(`体力见底了，先回一格再开练。`,`warn`),this.openEnergySheet();return}this.pendingOutcome=null;let e=Le({save:this.save,audio:this.audio,onComplete:e=>this.handleRoundComplete(e),onQuit:()=>{this.pendingOutcome=null,this.showHome(),this.toast(`这一把没算数，也没扣体力。随时回来。`,`default`)}});this.switchScreen(`training`,e)}startWarmup(){if(!this.save.profile){this.showOnboarding();return}if(V(this.save),this.save.progress.stamina<n.training.staminaCost){this.toast(`体力见底了，先回一格再开练。`,`warn`),this.openEnergySheet();return}this.pendingOutcome=null;let e=ze({save:this.save,audio:this.audio,onComplete:e=>this.handleRoundComplete(e),onQuit:()=>{this.pendingOutcome=null,this.showHome(),this.toast(`这一把没算数，也没扣体力。随时回来。`,`default`)}});this.switchScreen(`warmup`,e)}startDiet(){if(!this.save.profile){this.showOnboarding();return}if(V(this.save),this.save.progress.stamina<n.diet.staminaCost){this.toast(`体力见底了，先去睡一觉。`,`warn`),this.openEnergySheet();return}this.pendingOutcome=null;let e=qe({save:this.save,audio:this.audio,onComplete:e=>this.handleRoundComplete(e),onQuit:()=>{this.pendingOutcome=null,this.showHome(),this.toast(`这一把没算数，也没扣体力。随时回来。`,`default`)}});this.switchScreen(`diet`,e)}startSleep(){if(!this.save.profile){this.showOnboarding();return}V(this.save),this.pendingOutcome=null;let e=Ye({save:this.save,audio:this.audio,onClose:()=>this.showHome(),persist:()=>this.persist(),toast:(e,t)=>this.toast(e,t)});this.switchScreen(`sleep`,e)}handleRoundComplete(e){this.pendingOutcome=e;let t=Qe({save:this.save,audio:this.audio,outcome:e,claim:e=>this.claimReward(e),openShare:e=>this.showShare(e,`new`),goHome:()=>this.showHome(),toast:(e,t)=>this.toast(e,t)});this.switchScreen(`result`,t)}claimReward(e){if(!this.pendingOutcome)return null;let t=this.pendingOutcome,n=J(this.save,t,e,Date.now());return n?(this.pendingOutcome=null,R(this.save),n):null}showShare(e,t){let n=ot({save:this.save,record:e,audio:this.audio,mode:t,goHome:()=>this.showHome(),toast:(e,t)=>this.toast(e,t)});this.switchScreen(`share`,n)}toggleSound(){return this.save.settings.sound=!this.save.settings.sound,this.audio.setEnabled(this.save.settings.sound),R(this.save),this.save.settings.sound}openReserved(e){let t=n.reservedEntries.find(t=>t.id===e),r=f[e]??{title:`还在装修`,body:`这个入口还在施工，先把今天的训练打了。`},i=this.openSheet(`
      <button class="sheet__close" type="button" data-sheet-close aria-label="关闭">${X(`close`)}</button>
      <div class="coming-soon">
        <span class="coming-soon__tape">COMING SOON · 即将开放</span>
        <div class="coming-soon__icon">${X(t?.icon??`info`)}</div>
        <span class="eyebrow">UNDER CONSTRUCTION</span>
        <h2>${r.title}</h2>
        <p>${r.body}</p>
        <div class="coming-soon__stripe" aria-hidden="true"></div>
        <button class="btn btn--primary" type="button" data-start-from-sheet>知道了，先去练</button>
        <button class="sheet__text-button" type="button" data-sheet-close>下次再看</button>
      </div>
    `);i.overlay.querySelector(`[data-start-from-sheet]`)?.addEventListener(`click`,()=>{this.audio.tap(),i.close(),this.startTraining()})}openEnergySheet(){V(this.save);let e=this.save.progress.stamina;if(e>=n.stamina.max){this.audio.tap(),this.toast(`体力满格，随时开练。`,`success`);return}let t=U(this.save),r=t.full?`已满格`:C(t.nextInMs),i=Array.from({length:n.stamina.max},(t,n)=>`<span class="energy-pip ${n<e?`is-on`:``}"></span>`).join(``),a=this.openSheet(`
      <button class="sheet__close" type="button" data-sheet-close aria-label="关闭">${X(`close`)}</button>
      <div class="energy-sheet">
        <span class="energy-sheet__bolt">${X(`bolt`)}</span>
        <span class="eyebrow">ENERGY STATION</span>
        <h2>体力还剩 <em>${e}</em> 格</h2>
        <p>每 3 分钟自动恢复 1 点。想现在就继续，可以看 5 秒模拟广告立刻 +3 格。</p>
        <div class="energy-pips" aria-hidden="true">${i}</div>
        <div class="energy-sheet__next">${X(`clock`)} 下一格体力 <strong>${r}</strong> 后恢复</div>
        <button class="btn btn--primary energy-sheet__ad" type="button" id="energy-watch-ad">
          ${X(`tv`)} 看广告 · 体力 +${n.stamina.adRefill}
          <span>5s</span>
        </button>
        <button class="sheet__text-button" type="button" data-sheet-close>不看广告，等它自己回</button>
        <p class="energy-sheet__note">广告只是加速，不看你也能玩完全部内容</p>
      </div>
    `);a.overlay.querySelector(`#energy-watch-ad`)?.addEventListener(`click`,()=>{this.audio.tap(),a.close(),Z({host:this.modalHost,audio:this.audio,variant:`stamina`,onRewarded:()=>{let e=ce(this.save,n.stamina.adRefill);this.saveGame(),this.currentScreenName===`home`&&this.showHome(),this.toast(`体力 +${e}，接着练。`,`success`)},onCancelled:()=>{this.toast(`没关系，体力会自己慢慢回的。`,`default`)}})})}openSheet(e){this.closeSheet();let t=document.createElement(`div`);t.className=`sheet-backdrop`,t.innerHTML=`
      <div class="sheet" role="dialog" aria-modal="true">
        <span class="sheet__drag" aria-hidden="true"></span>
        ${e}
      </div>
    `,this.modalHost.appendChild(t),requestAnimationFrame(()=>t.classList.add(`is-open`));let n=()=>{this.activeSheet?.overlay===t&&(t.classList.remove(`is-open`),t.classList.add(`is-closing`),window.setTimeout(()=>t.remove(),180),this.activeSheet=null,this.escapeHandler&&=(document.removeEventListener(`keydown`,this.escapeHandler),null))},r={overlay:t,close:n};return this.activeSheet=r,t.addEventListener(`click`,e=>{e.target===t&&n()}),t.querySelectorAll(`[data-sheet-close]`).forEach(e=>{e.addEventListener(`click`,()=>{this.audio.tap(),n()})}),this.escapeHandler=e=>{e.key===`Escape`&&(e.preventDefault(),n())},document.addEventListener(`keydown`,this.escapeHandler),requestAnimationFrame(()=>{t.querySelector(`.btn, .sheet__close`)?.focus({preventScroll:!0})}),r}closeSheet(){if(!this.activeSheet)return;let e=this.activeSheet;this.activeSheet=null,e.overlay.remove(),this.escapeHandler&&=(document.removeEventListener(`keydown`,this.escapeHandler),null)}saveGame(){R(this.save)}toast(e,t=`default`){let n=this.toastHost.querySelectorAll(`.toast`);n.length>=2&&n[0]?.remove();let r=document.createElement(`div`);r.className=`toast toast--${t}`,r.innerHTML=`<span class="toast__icon">${X(t===`success`?`check`:t===`warn`?`info`:`spark`)}</span><span>${e}</span>`,this.toastHost.appendChild(r),requestAnimationFrame(()=>r.classList.add(`is-visible`)),window.setTimeout(()=>{r.classList.remove(`is-visible`),window.setTimeout(()=>r.remove(),260)},2600)}};try{new st().start()}catch(e){console.error(`[PixelFit] Failed to boot.`,e);let t=document.querySelector(`#screen-host`);t&&(t.innerHTML=`
      <div style="position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:14px;padding:32px;text-align:center;background:#0b0820;color:#fff6e4;font-family:'Microsoft YaHei',sans-serif;">
        <strong style="font-size:28px;color:#d7ff3f;">PixelFit 没热身成功</strong>
        <p style="margin:0;font-size:13px;line-height:1.7;color:rgba(255,246,228,.65);">刷新页面再试一次。如果一直这样，检查浏览器是否支持 Canvas 与 localStorage。</p>
        <button onclick="location.reload()" style="border:0;background:#d7ff3f;color:#0b0820;font-weight:800;padding:12px 22px;border-radius:12px;font-size:14px;">重新加载</button>
      </div>
    `)}