import React, { useRef, useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import {
  initAnalysesAC,
  initAnalysesIdAC,
  listAnalysesAC,
} from '../../utils/redux/actionCreators/actionCreators'
import ChartLineALB from '../ChartLine/ChartLineALB'
import ChartLineLDH from '../ChartLine/ChartLineLDH'
import ChartLineALP from '../ChartLine/ChartLineALP'
import ChartLineALT from '../ChartLine/ChartLineALT'
import ChartLineAST from '../ChartLine/ChartLineAST'
import ChartLineGLU from '../ChartLine/ChartLineGLU'
import ChartLineTB from '../ChartLine/ChartLineT_B'
import ChartLineTCho from '../ChartLine/ChartLineT_Cho'
import ChartLineTP from '../ChartLine/ChartLineT_P'

import ChartList from '../ChartList/ChartList'
import DetailsBloodAnalyse from '../DetailsBloodAnalyse/DetailsBloodAnalyse'
import ProfileNav from '../Profile/ProfileNav'
import './Analysis.css'

function Blood(props) {
  const [details, setDetails] = useState(false)
  const [ldh, setLdh] = useState(false)
  const [albymin, setAlbymin] = useState(false)
  const [ALP, setALP] = useState(false)
  const [ALT, setALT] = useState(false);
  const [AST, setAST] = useState(false);
  const [GLU, setGLU] = useState(false);
  const [TB, setTB] = useState(false);
  const [TCho, setTCho] = useState(false);
  const [TP, setTP] = useState(false);


  const { id } = useParams()

  const petState = useSelector((state) => state.petsReducer.pet)
  const index = petState.findIndex((el) => el._id === id)
  const dispatch = useDispatch()

  useEffect(() => {
    fetch('http://localhost:4000/analyses', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id: petState[index]._id,
        spacies: petState[index].spacies,
      }),
    })
      .then((res) => res.json())
      .then((data) => dispatch(initAnalysesAC(data)))
  }, [dispatch])

  useEffect(() => {
    fetch('http://localhost:4000/analyses/list', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id: petState[index]._id,
        spacies: petState[index].spacies,
      }),
    })
      .then((res) => res.json())
      .then((data) => dispatch(listAnalysesAC(data)))
  }, [dispatch])

  const [state, setState] = useState(false)
  const text = useRef()

  const addBlood = (ev) => {
    ev.preventDefault()
    const index = petState.findIndex((el) => el._id === id)
    const newBlood = {
      spacies: petState[index].spacies,
      owner: id,
      date: text.current.date.value,
      LDH: text.current.LDH.value,
      ALT: text.current.ALT.value,
      AST: text.current.AST.value,
      ALB: text.current.ALB.value,
      T_Pro: text.current.T_Pro.value,
      T_Bil: text.current.T_Bil.value,
      GLU: text.current.GLU.value,
      T_Cho: text.current.T_Cho.value,
      ALP: text.current.ALP.value,
    }
    
    fetch('http://localhost:4000/addblood', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newBlood),
    })
      .then((res) => res.json())
      .then((result) => {
        setState(false)
      })
  }

  return (
    <>
      <div className="container">
        <div className="main-wrapper1">
          <ProfileNav />
          <div className="tests">
            <div className="tests-info">
              <Link to={`/mypets/${id}`}>
                <img
                  style={{ marginBottom: "40px" }}
                  src="/left-arrow.svg"
                  alt=""
                  width="40px"
                />
              </Link>
              <h2>Анализ крови</h2>

              <div onClick={() => setState(true)} className="pet-item-add">
                <p>Добавить анализ</p>
              </div>
            </div>
            <div style={{ marginBottom: "50px" }}>
              <ChartList />
            </div>

            {state && (
              <form className="form-body" ref={text}>
                <h2 className="form-title">Добавление анализа</h2>
                <div className="form-item">
                  <input
                    name="date"
                    type="date"
                    placeholder="date"
                    className="form-input"
                  />
                </div>
                <div className="form-item">
                  <input
                    name="LDH"
                    type="number"
                    placeholder="LDH"
                    className="form-input"
                  />
                </div>
                <div className="form-item">
                  <input
                    name="ALT"
                    type="number"
                    placeholder="ALT"
                    className="form-input"
                  />
                </div>
                <div className="form-item">
                  <input
                    name="AST"
                    type="number"
                    placeholder="AST"
                    className="form-input"
                  />
                </div>
                <div className="form-item">
                  <input
                    name="ALB"
                    type="number"
                    placeholder="ALB"
                    className="form-input"
                  />
                </div>
                <div className="form-item">
                  <input
                    name="T_Pro"
                    type="number"
                    placeholder="T_Pro"
                    className="form-input"
                  />
                </div>
                <div className="form-item">
                  <input
                    name="T_Bil"
                    type="number"
                    placeholder="T_Bil"
                    className="form-input"
                  />
                </div>
                <div className="form-item">
                  <input
                    name="GLU"
                    type="number"
                    placeholder="GLU"
                    className="form-input"
                  />
                </div>
                <div className="form-item">
                  <input
                    name="T_Cho"
                    type="number"
                    placeholder="T_Cho"
                    className="form-input"
                  />
                </div>
                <div className="form-item">
                  <input
                    name="ALP"
                    type="number"
                    placeholder="ALP"
                    className="form-input"
                  />
                </div>
                <button onClick={addBlood} className="form-buttom">
                  Добавить анализ
                </button>
              </form>
            )}

            <button onClick={() => setDetails(!details)}>
              Подробный анализ &rarr;
            </button>
          </div>

          {details ? (
            <>
              <div className="tests">
                <DetailsBloodAnalyse />
                <div className="tests">
                  <h3>ЛДГ (лактатдегидрогеназа) </h3>
                  <ul>
                    <p>Референсные значения:</p>
                    <li style={{ listStyleType: "none" }}>
                      Собаки: 20-350 Ед/л
                    </li>
                    <li style={{ listStyleType: "none" }}>
                      Кошки: 40-350 Ед/л
                    </li>
                  </ul>
                  <ChartLineLDH />
                  <button onClick={() => setLdh(!ldh)}>Пояснения &rarr;</button>
                  {ldh ? (

                    <ul className="list5b">
                      <h4>Повышение уровня:</h4>
                      <li>Состояния или заболевания, приводящие к гемолизу</li>
                      <li>Повреждения скелетной мускулатуры</li>
                      <li>Гепатоцелюллярные повреждения</li>
                      <li>Инфаркт миокарда</li>
                      <li>Неопластические процессы</li>
                      <li>Острый панкреатит</li>
                      <li>Нефрит</li>
                      <li>Лептоспироз</li>
                      <li>Инфекционный перитонит кошек</li>
                      <h4>Понижение уровня:</h4>
                      <li>Не имеет клинической значимости</li>
                    </ul>

                  ) : null}
                </div>
                <div className="tests">
                  <h3>Альбумин </h3>
                  <ul>
                    <p>Референсные значения:</p>
                    <li style={{ listStyleType: "none" }}>
                      Собаки: 0-6 мес. ‒ 15-37 г/л; 6-12 мес. – 26-37 г/л;
                      старше одного года – 25-37 г/л
                    </li>
                    <li style={{ listStyleType: "none" }}>
                      Кошки: 0-6 мес. ‒ 19-30 г/л; 6-12 мес. – 24-38 г/л; старше
                      1 года – 24-39 г/л
                    </li>
                  </ul>
                  <ChartLineALB />
                  <button onClick={() => setAlbymin(!albymin)}>
                    Пояснения &rarr;
                  </button>
                  {albymin ? (
                    <ul className="list5b">
                      <h4>Повышение уровня:</h4>
                      <li>Гемоконцентрация в результате дегидратации</li>
                      <h4>Понижение уровня:</h4>
                      <li>
                        Снижение синтеза (при печеночной недостаточности,
                        синдроме мальабсорбции, экзокринной недостаточности
                        поджелудочной железы, воспалении)
                      </li>
                      <li>Потеря крови</li>
                      <li>
                        Потеря белка, связанная с нефропатией
                        (иммуноопосредованным или врожденным гломерулонефритом,
                        амилоидозом печени)
                      </li>
                      <li>
                        Потеря белка, связанная с энтеропатией (заболеваниями
                        слизистой оболочки тонкого отдела кишечника, вызванными
                        воспалительным процессом или неоплазией; кишечной
                        лимфангиэктазией (идиопатической гипопротеинемией);
                        желудочно-кишечными кровотечениями, в т. ч. вызванными
                        гельминтозами)
                      </li>
                      <li>
                        Потеря белка, связанная с дерматопатией (ожогами,
                        экссудативной формой генерализованного заболевания кожи)
                      </li>
                      <li>Васкулит</li>
                      <li>Чрезмерное внутривенное введение жидкости</li>
                      <li>
                        Гемодилюция, вызванная синдромом неадекватной секрецией
                        антидиуретического гормона (СНАДГ), или отечным
                        синдромом при хронической сердечной недостаточности
                      </li>
                    </ul>
                  ) : null}
                </div>
                <div className="tests">
                  <h3> Щелочная фосфатаза </h3>
                  <ul>
                    <p>Референсные значения:</p>
                    <li style={{ listStyleType: "none" }}>
                      Собаки: 0–6 мес. — 135–520 Ед/л; 6–12 мес. — 70–252 Ед/л;
                      старше одного года — 10–80 Ед/л
                    </li>
                    <li style={{ listStyleType: "none" }}>
                      0–6 мес. — 184–538 Ед/л; 6–12 мес. — 21–197 Ед/л; старше
                      одного года — 10–92 Ед/л
                    </li>
                  </ul>
                  <ChartLineALP />
                  <button onClick={() => setALP(!ALP)}>Пояснения &rarr;</button>
                  {ALP ? (
                    <ul className="list5b">
                      <h4>Повышение уровня:</h4>
                      <li>Холестаз</li>
                      <li>
                        Повышение эндогенной концентрации или назначение
                        кортикостероидов
                      </li>
                      <li>Стресс</li>
                      <li>Нодулярная гиперплазия печени</li>
                      <li>Липидоз печени</li>
                      <li>Цирроз</li>
                      <li>Гепатит или холангиогепатит</li>
                      <li>Желчнокаменная болезнь</li>
                      <li>Холецистит</li>
                      <li>Печеночная или билиарная неоплазия</li>
                      <li>Панкреатит</li>
                      <li>Терапия антиконвульсантами</li>
                      <li>Гипертиреоидизм</li>
                      <li>
                        Болезнь накопления меди (болезнь Коновалова-Вильсона)
                      </li>
                      <li>Молодой возраст, растущие животные</li>
                      <li>Период заживления перелома</li>
                      <li>Неоплазия костной ткани</li>
                      <li>
                        Метаболические заболевания костей (резорбция костной
                        ткани)
                      </li>
                      <li>Беременность</li>
                      <li>
                        Наследственная гиперфосфатемия (у сибирских хаски,
                        шотландских терьеров)
                      </li>
                      <h4>Понижение уровня:</h4>
                      <li>Не имеет диагностической значимости</li>
                    </ul>
                  ) : null}
                </div>
                <div className="tests">
                  <h3>Аланинаминотрансфераза (АЛТ) </h3>
                  <ul>
                    <p>Референсные значения:</p>
                    <li style={{ listStyleType: "none" }}>
                      Собаки: 0 — 6 мес. — 10–32 Ед/л; 6–12 мес. — 10–45 Ед/л;
                      старше одного года — 10–65 Ед/л
                    </li>
                    <li style={{ listStyleType: "none" }}>
                      Кошки: 0–6 мес. — 10–50 Ед/л; 6–12 мес. — 10–75 Ед/л;
                      старше одного года — 10–85 Ед/л
                    </li>
                  </ul>
                  <ChartLineALT />
                  <button onClick={() => setALT(!ALT)}>Пояснения &rarr;</button>
                  {ALT ? (
                    <ul className="list5b">
                      <h4>Повышение уровня:</h4>
                      <li>Гепатит</li>
                      <li>
                        Гипоксия (анемия, сердечно-сосудистые заболевания)
                      </li>
                      <li>Неоплазии гепатобилиарной системы</li>
                      <li>Стероидная гепатопатия</li>
                      <li>
                        Действие гепатотоксичных лекарственных препаратов или
                        токсинов
                      </li>
                      <li>Липидоз печени</li>
                      <li>Панкреатит</li>
                      <li>Травматические поражения печеночной ткани</li>
                      <li>Паразитирование печеночного сосальщика</li>
                      <li>Болезнь накопления меди</li>
                      <li>
                        Повреждение или обширный некроз мышечной ткани, миозит
                      </li>
                      <li>Мышечное переутомление</li>
                      <h4>Понижение уровня:</h4>
                      <li>Атрофия печени (врожденные портосистемные шунты)</li>
                      <li>Снижение уровня витамина В6</li>
                    </ul>
                  ) : null}
                </div>
                <div className="tests">
                  <h3>АСТ (аспартатаминотрансфераза) </h3>
                  <ul>
                    <p>Референсные значения:</p>
                    <li style={{ listStyleType: "none" }}>
                      неонаталы (первые три дня жизни, питание молозивом- 44-194
                      Ед/л; 0-6 мес. ‒ 10-23 Ед/л; 6-12 мес. ‒ 10-20 Ед/л;
                      старше одного года ‒ 10-50 Ед/л
                    </li>
                    <li style={{ listStyleType: "none" }}>
                      Кошки: 0-6 мес. ‒ 10-30 Ед/л; 6-12 мес. – 7-40 Ед/л;
                      старше одного года – 10-56 Ед/л
                    </li>
                  </ul>
                  <ChartLineAST />
                  <button onClick={() => setAST(!AST)}>Пояснения &rarr;</button>
                  {AST ? (
                    <ul className="list5b">
                      <h4>Повышение уровня:</h4>
                      <li>Гепатоцеллюлярное повреждение</li>
                      <li>Воспаление (гепатит)</li>
                      <li>Действие токсических и лекарственных препаратов</li>
                      <li>Гепатобилиарные неоплазии</li>
                      <li>Применение кортикостероидов</li>
                      <li>Липидоз печени</li>
                      <li>
                        Гипоксия (анемия, сердечно-сосудистые заболевания)
                      </li>
                      <li>Панкреатит</li>
                      <li>
                        Повреждение мышечной ткани, мышечное перенапряжение
                      </li>
                      <li>Миозит</li>
                      <li>Цирроз печени</li>
                      <li>Паразитирование печеночного сосальщика</li>
                      <li>Патологическое депонирование меди</li>
                      <li>Внутрисосудистый гемолиз</li>
                      <li>Иммуноопосредованная гемолитическая анемия</li>
                      <li>
                        Оксидативные повреждения (действие цинка, ацетаминофена
                        (у кошек), репчатого лука)
                      </li>
                      <li>Кровепаразиты, поражающие эритроциты</li>
                      <li>Гемолиз in vitro (артефакт)</li>
                      <h4>Понижение уровня:</h4>
                      <li>
                        Атрофия печени (как в случаях формирования хронических и
                        врожденных портосистемных шунтов)
                      </li>
                      <li>Снижение концентрации пиридоксаль-5-фосфата</li>
                    </ul>
                  ) : null}
                </div>
                <div className="tests">
                  <h3>Глюкоза </h3>
                  <ul>
                    <p>Референсные значения:</p>
                    <li style={{ listStyleType: "none" }}>
                      Собаки: 0–6 мес. — 2,86–12 ммоль/л; 6–12 мес. — 4,2–6,6
                      ммоль/л; старше одного года — 4,3–6,6 ммоль/л
                    </li>
                    <li style={{ listStyleType: "none" }}>
                      Кошки: 0–6 мес. — 3–12 ммоль/л; 6–12 мес. — 3,8–9,8
                      ммоль/л; старше одного года — 3,2–7,9 ммоль/л
                    </li>
                  </ul>
                  <ChartLineGLU />
                  <button onClick={() => setGLU(!GLU)}>Пояснения &rarr;</button>
                  {GLU ? (
                    <ul className="list5b">
                      <h4>Повышение уровня:</h4>
                      <li>Сахарный диабет</li>
                      <li>
                        Дефицит инсулина (иммуноопосредованная деструкция
                        β-клеток, панкреатит)
                      </li>
                      <li>
                        Инсулинорезистентность (гиперадренокортицизм,
                        акромегалия, феохромоцитома, глюкагонома)
                      </li>
                      <li>Беспокойство или страх</li>
                      <li>Гипертиреоидизм</li>
                      <li>Гепатокожный синдром</li>
                      <li>Лекарственная терапия</li>
                      <h4>Понижение уровня:</h4>
                      <li>Сепсис</li>
                      <li>Болезни накопления гликогена</li>
                      <li>
                        Паранеопластический синдром, новообразования β-клеток
                        панкреатических островков (инсулинома)
                      </li>
                      <li>Лейомиосаркома</li>
                      <li>Печеночная недостаточность</li>
                      <li>Гипоадренокортицизм</li>
                      <li>Физическая нагрузка (у охотничьих пород собак)</li>
                      <li>
                        Ювинильная и неонатальная гипогликемия, в частности, у
                        миниатюрных пород собак
                      </li>
                      <li>Поздние сроки беременности</li>
                      <li>Гипопитуитаризм</li>
                      <li>Голодание или мальабсорбция</li>
                    </ul>
                  ) : null}
                </div>
                <div className="tests">
                  <h3>Билирубин общий </h3>
                  <ul>
                    <p>Референсные значения:</p>
                    <li style={{ listStyleType: "none" }}>
                      {`Собаки: \<10 мкмоль/л`}
                    </li>
                    <li style={{ listStyleType: "none" }}>
                      {`Кошки: \<10 мкмоль/л`}
                    </li>
                  </ul>
                  <ChartLineTB />
                  <button onClick={() => setTB(!TB)}>Пояснения &rarr;</button>
                  {TB ? (
                    <ul className="list5b">
                      <h4>Повышение уровня:</h4>
                      <li>
                        Увеличение образования билирубина (надпеченочная
                        гипербилирубинемия). Развивается в основном за счет
                        повышения фракции неконъюгированного билирубина
                      </li>
                      <li>
                        Разрушение эритроцитов, происходящее вследствие
                        заболеваний (иммуноопосредованной гемолитической анемии,
                        инвазии кровепаразитами, отравления цинком,
                        гипофосфатемии), внутреннего кровотечения или
                        переливания несовместимой крови (гемолитического шока)
                      </li>
                      <li>
                        Превышение потенциала печеночных клеток к поглощению,
                        конъюгации и/или секреции при повышенной концентрации
                        билирубина
                      </li>
                      <li>
                        Снижение способности печеночных клеток к поглощению или
                        конъюгации билирубина гепатоцитами (печеночная
                        гипербилирубинемия). Повышение общего билирубина
                        происходит за счет неконъюгированного и прямого
                        билирубина
                      </li>
                      <li>В результате паренхиматозного поражения печени</li>
                      <li>
                        Снижение поглощения билирубина гепатоцитами при
                        анорексии или голодании у лошадей. Концентрация общего
                        билирубина у здоровых лошадей может достигать 171
                        мкмоль/л (10 мг/дл)
                      </li>
                      <li>
                        Снижение способности гепатоцитов поглощать билирубин при
                        сепсисе
                      </li>
                      <li>
                        Холестаз (подпеченочная гипербилирубинемия). Повышение
                        концентрации общего билирубина происходит за счет
                        конъюгированного и неконъюгированного билирубина
                      </li>
                      <li>Снижение секреции билирубина в желчные канальцы</li>
                      <li>
                        Физическая непроходимость желчных протоков в результате
                        опухолевого заболевания, набухания гепатоцитов при
                        липидозе печени или гепатопатии, вызванной
                        кортикостероидной терапией
                      </li>
                      <li>
                        Развитие внепеченочного холестаза при холангите,
                        желчнокаменной болезни, холецистите и панкреатите
                      </li>
                      <h4>Понижение уровня:</h4>
                      <li>Не имеет клинической значимости</li>
                    </ul>
                  ) : null}
                </div>
                <div className="tests">
                  <h3>Холестерин </h3>
                  <ul>
                    <p>Референсные значения:</p>
                    <li style={{ listStyleType: "none" }}>
                      Собаки: 0–6 мес.: 2,9–9,1 ммоль/л; 6–12 мес.: 3,51–7,2
                      ммоль/л; старше года: 2,9 -7,50 ммоль/л
                    </li>
                    <li style={{ listStyleType: "none" }}>
                      Кошки: 0–6 мес.: 1,2–6 5 ммоль/л; 6–12 мес.: 3,2–5,7
                      ммоль/л; старше года: 2,3 -5,9 ммоль/л
                    </li>
                  </ul>
                  <ChartLineTCho />
                  <button onClick={() => setTCho(!TCho)}>
                    Пояснения &rarr;
                  </button>
                  {TCho ? (
                    <ul className="list5b">
                      <h4>Повышение уровня:</h4>
                      <li>
                        Снижение утилизации липопротеинов (гипотиреоидизм)
                      </li>
                      <li>Сахарный диабет</li>
                      <li>Гиперадренокортицизм</li>
                      <li>Действие экзогенных кортикостероидов</li>
                      <li>Острый (некротический) панкреатит</li>
                      <li>Обструктивный холестаз (редко)</li>
                      <h4>Понижение уровня:</h4>
                      <li>Снижениесинтеза</li>
                      <li>Портосистемные шунты</li>
                      <li>Печеночнаянедостаточность</li>
                      <li>
                        Синдром мальдигестии, экзокринная недостаточность
                        поджелудочной железы
                      </li>
                      <li>
                        Синдром мальабсорбции, энтеропатия с потерей белка
                        (особенно лимфангиэктазия)
                      </li>
                      <li>Истощение</li>
                    </ul>
                  ) : null}
                </div>
                <div className="tests">
                  <h3>Общий белок </h3>
                  <ul>
                    <p>Референсные значения:</p>
                    <li style={{ listStyleType: "none" }}>
                      Собаки: 0–6 мес. ‒ 34–52 г/л; 6–12 мес. — 49–67 г/л;
                      старше одного года — 54–77 г/л
                    </li>
                    <li style={{ listStyleType: "none" }}>
                      Кошки: 0–6 мес. — 38–65 г/л; 6–12 мес. — 33–75 г/л; старше
                      одного года — 57–79 г/л
                    </li>
                  </ul>
                  <ChartLineTP />
                  <button onClick={() => setTP(!TP)}>Пояснения &rarr;</button>
                  {TP ? (
                    <ul className="list5b">
                      <h4>Повышение уровня:</h4>
                      <li>Гемоконцентрация (дегидратация)</li>
                      <li>
                        Воспалительный процесс (инфекционной, неинфекционной
                        этиологии)
                      </li>
                      <li>Лимфоидный лейкоз (например, В-клеточная лимфома)</li>
                      <li>Множественная миелома</li>
                      <h4>Понижение уровня:</h4>
                      <li>Гиперволемия</li>
                      <li>Хроническая сердечная недостаточность</li>
                      <li>Нефротический синдром</li>
                      <li>Цирроз печени</li>
                      <li>
                        Синдром неадекватной секреции антидиуретического гормона
                        (СНАСАГ, синдром Пархона)
                      </li>
                      <li>Энтеропатия с потерей белка</li>
                      <li>Нефропатия с потерей белка</li>
                      <li>Экссудативные формы заболевания кожи</li>
                      <li>Голодание или кахексия</li>
                      <li>Нарушение переваривания пищи или мальабсорбция</li>
                      <li>Печеночная недостаточность</li>
                      <li>Нарушение пассивного транспорта</li>
                      <li>Снижение иммуноглобулинов</li>
                    </ul>
                  ) : null}
                </div>
              </div>
            </>
          ) : null}
        </div>
      </div>
    </>
  );
}

export default Blood
