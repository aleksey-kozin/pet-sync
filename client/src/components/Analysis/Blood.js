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
import Modal from '../Modal/Modal'

function Blood(props) {
  const [details, setDetails] = useState(false)
  const [ldh, setLdh] = useState(false)
  const [albymin, setAlbymin] = useState(false)
  const [ALP, setALP] = useState(false)
  const [ALT, setALT] = useState(false)
  const [AST, setAST] = useState(false)
  const [GLU, setGLU] = useState(false)
  const [TB, setTB] = useState(false)
  const [TCho, setTCho] = useState(false)
  const [TP, setTP] = useState(false)

  const [modalActive, setModalActive] = useState(false)
  const [show, setShow] = useState(false)

  const { id } = useParams()

  const petState = useSelector((state) => state.petsReducer.pet)
  const index = petState.findIndex((el) => el._id === id)
  const analyses = useSelector((state) => state.analysesReducer.analyses)
  const dispatch = useDispatch()

  const normal = {
    LDH: [220, 450],
    ALT: [8, 57],
    AST: [9, 49],
    ALB: [22, 39],
    T_Pro: [50, 100],
    T_Bil: [1, 10],
    GLU: [3, 6],
    T_Cho: [3, 7],
    ALP: [10, 100],
  }

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
      .then((data) => {
        dispatch(initAnalysesAC(data))
        return data
      })
      .then((data) => (Object.keys(data).length !== 0 ? setShow(true) : null))
  }, [dispatch, modalActive])

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
  }, [dispatch, details])

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
      .then(() => {
        setModalActive(false)
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

              <button
                className="analis-btn"
                dfvdfv
                onClick={() => setModalActive(true)}
              >
                Добавить анализ
              </button>
            </div>

            {show ? (
              <div style={{ marginBottom: "50px" }}>
                <ChartList />
              </div>
            ) : null}

            <Modal active={modalActive} setActive={setModalActive}>
              <form onSubmit={addBlood} className="form-body1" ref={text}>
                <h2 className="form-title1">Добавление анализа</h2>
                <div className="form-item1">
                  <input
                    name="date"
                    type="date"
                    placeholder="date"
                    className="form-input1"
                    required="required"
                  />
                </div>
                <div className="form-item1">
                  <input
                    name="LDH"
                    type="number"
                    placeholder="LDH"
                    className="form-input1"
                    required="required"
                  />
                </div>
                <div className="form-item1">
                  <input
                    name="ALT"
                    type="number"
                    placeholder="ALT"
                    className="form-input1"
                    required="required"
                  />
                </div>
                <div className="form-item1">
                  <input
                    name="AST"
                    type="number"
                    placeholder="AST"
                    className="form-input1"
                    required="required"
                  />
                </div>
                <div className="form-item1">
                  <input
                    name="ALB"
                    type="number"
                    placeholder="ALB"
                    className="form-input1"
                    required="required"
                  />
                </div>
                <div className="form-item1">
                  <input
                    name="T_Pro"
                    type="number"
                    placeholder="T_Pro"
                    className="form-input1"
                    required="required"
                  />
                </div>
                <div className="form-item1">
                  <input
                    name="T_Bil"
                    type="number"
                    placeholder="T_Bil"
                    className="form-input1"
                    required="required"
                  />
                </div>
                <div className="form-item1">
                  <input
                    name="GLU"
                    type="number"
                    placeholder="GLU"
                    className="form-input1"
                    required="required"
                  />
                </div>
                <div className="form-item1">
                  <input
                    name="T_Cho"
                    type="number"
                    placeholder="T_Cho"
                    className="form-input1"
                    required="required"
                  />
                </div>
                <div className="form-item1">
                  <input
                    name="ALP"
                    type="number"
                    placeholder="ALP"
                    className="form-input1"
                    required="required"
                  />
                </div>
                <button className="form-buttom1">Добавить анализ</button>
              </form>
            </Modal>

            {show ? (
              <button
                className="analis-btn"
                onClick={() => setDetails(!details)}
              >
                Подробный анализ &rarr;
              </button>
            ) : null}
          </div>

          {details ? (
            <>
              <div className="tests">
                <DetailsBloodAnalyse />
              </div>
              <div className="tests">
                {normal.LDH[0] <= analyses.LDH &&
                normal.LDH[1] >= analyses.LDH ? (
                  <h3 style={{ color: "green" }}>ЛДГ (лактатдегидрогеназа) </h3>
                ) : (
                  <h3 style={{ color: "Gold" }}>ЛДГ (лактатдегидрогеназа) </h3>
                )}
                <ul>
                  <p>Референсные значения:</p>
                  <li style={{ listStyleType: "none" }}>
                    Собаки: 220-450 Ед/л
                  </li>
                  <li style={{ listStyleType: "none" }}>Кошки: 320-460 Ед/л</li>
                </ul>
                <ChartLineLDH />
                <button className="analis-btn" onClick={() => setLdh(!ldh)}>
                  Пояснения &rarr;
                </button>
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
                {normal.ALB[0] <= analyses.ALB &&
                normal.ALB[1] >= analyses.ALB ? (
                  <h3 style={{ color: "green" }}>Альбумин </h3>
                ) : (
                  <h3 style={{ color: "Gold" }}>Альбумин </h3>
                )}

                <ul>
                  <p>Референсные значения:</p>
                  <li style={{ listStyleType: "none" }}>Собаки: 22-39 г/л</li>
                  <li style={{ listStyleType: "none" }}>Кошки: 22-32 г/л</li>
                </ul>
                <ChartLineALB />
                <button
                  className="analis-btn"
                  onClick={() => setAlbymin(!albymin)}
                >
                  Пояснения &rarr;
                </button>
                {albymin ? (
                  <ul className="list5b">
                    <h4>Повышение уровня:</h4>
                    <li>Гемоконцентрация в результате дегидратации</li>
                    <h4>Понижение уровня:</h4>
                    <li>
                      Снижение синтеза (при печеночной недостаточности, синдроме
                      мальабсорбции, экзокринной недостаточности поджелудочной
                      железы, воспалении)
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
                      антидиуретического гормона (СНАДГ), или отечным синдромом
                      при хронической сердечной недостаточности
                    </li>
                  </ul>
                ) : null}
              </div>
              <div className="tests">
                {normal.ALP[0] <= analyses.ALP &&
                normal.ALP[1] >= analyses.ALP ? (
                  <h3 style={{ color: "green" }}>Щелочная фосфатаза </h3>
                ) : (
                  <h3 style={{ color: "Gold" }}>Щелочная фосфатаза </h3>
                )}

                <ul>
                  <p>Референсные значения:</p>
                  <li style={{ listStyleType: "none" }}>Собаки: 10-100 Ед/л</li>
                  <li style={{ listStyleType: "none" }}>Кошки: 12-65 Ед/л</li>
                </ul>
                <ChartLineALP />
                <button className="analis-btn" onClick={() => setALP(!ALP)}>
                  Пояснения &rarr;
                </button>
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
                {normal.ALT[0] <= analyses.ALT &&
                normal.ALT[1] >= analyses.ALT ? (
                  <h3 style={{ color: "green" }}>
                    Аланинаминотрансфераза (АЛТ){" "}
                  </h3>
                ) : (
                  <h3 style={{ color: "Gold" }}>
                    Аланинаминотрансфераза (АЛТ){" "}
                  </h3>
                )}

                <ul>
                  <p>Референсные значения:</p>
                  <li style={{ listStyleType: "none" }}>Собаки: 8-57 Ед/л</li>
                  <li style={{ listStyleType: "none" }}>Кошки: 8-52 Ед/л</li>
                </ul>
                <ChartLineALT />
                <button className="analis-btn" onClick={() => setALT(!ALT)}>
                  Пояснения &rarr;
                </button>
                {ALT ? (
                  <ul className="list5b">
                    <h4>Повышение уровня:</h4>
                    <li>Гепатит</li>
                    <li>Гипоксия (анемия, сердечно-сосудистые заболевания)</li>
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
                {normal.AST[0] <= analyses.AST &&
                normal.AST[1] >= analyses.AST ? (
                  <h3 style={{ color: "green" }}>
                    АСТ (аспартатаминотрансфераза){" "}
                  </h3>
                ) : (
                  <h3 style={{ color: "Gold" }}>
                    АСТ (аспартатаминотрансфераза){" "}
                  </h3>
                )}
                <h3> </h3>
                <ul>
                  <p>Референсные значения:</p>
                  <li style={{ listStyleType: "none" }}>Собаки: 9-49 Ед/л</li>
                  <li style={{ listStyleType: "none" }}>Кошки: 9-39 Ед/л</li>
                </ul>
                <ChartLineAST />
                <button className="analis-btn" onClick={() => setAST(!AST)}>
                  Пояснения &rarr;
                </button>
                {AST ? (
                  <ul className="list5b">
                    <h4>Повышение уровня:</h4>
                    <li>Гепатоцеллюлярное повреждение</li>
                    <li>Воспаление (гепатит)</li>
                    <li>Действие токсических и лекарственных препаратов</li>
                    <li>Гепатобилиарные неоплазии</li>
                    <li>Применение кортикостероидов</li>
                    <li>Липидоз печени</li>
                    <li>Гипоксия (анемия, сердечно-сосудистые заболевания)</li>
                    <li>Панкреатит</li>
                    <li>Повреждение мышечной ткани, мышечное перенапряжение</li>
                    <li>Миозит</li>
                    <li>Цирроз печени</li>
                    <li>Паразитирование печеночного сосальщика</li>
                    <li>Патологическое депонирование меди</li>
                    <li>Внутрисосудистый гемолиз</li>
                    <li>Иммуноопосредованная гемолитическая анемия</li>
                    <li>
                      Оксидативные повреждения (действие цинка, ацетаминофена (у
                      кошек), репчатого лука)
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
                {normal.GLU[0] <= analyses.GLU &&
                normal.GLU[1] >= analyses.GLU ? (
                  <h3 style={{ color: "green" }}>Глюкоза</h3>
                ) : (
                  <h3 style={{ color: "Gold" }}>Глюкоза </h3>
                )}

                <ul>
                  <p>Референсные значения:</p>
                  <li style={{ listStyleType: "none" }}>Собаки: 3-6 ммоль/л</li>
                  <li style={{ listStyleType: "none" }}>Кошки: 3-8 ммоль/л</li>
                </ul>
                <ChartLineGLU />
                <button className="analis-btn" onClick={() => setGLU(!GLU)}>
                  Пояснения &rarr;
                </button>
                {GLU ? (
                  <ul className="list5b">
                    <h4>Повышение уровня:</h4>
                    <li>Сахарный диабет</li>
                    <li>
                      Дефицит инсулина (иммуноопосредованная деструкция
                      β-клеток, панкреатит)
                    </li>
                    <li>
                      Инсулинорезистентность (гиперадренокортицизм, акромегалия,
                      феохромоцитома, глюкагонома)
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
                {normal.T_Bil[0] <= analyses.T_Bil &&
                normal.T_Bil[1] >= analyses.T_Bil ? (
                  <h3 style={{ color: "green" }}>Билирубин общий</h3>
                ) : (
                  <h3 style={{ color: "Gold" }}>Билирубин общий </h3>
                )}

                <ul>
                  <p>Референсные значения:</p>
                  <li style={{ listStyleType: "none" }}>
                    {`Собаки: \<10 мкмоль/л`}
                  </li>
                  <li style={{ listStyleType: "none" }}>Кошки: 2-5 мкмоль/л</li>
                </ul>
                <ChartLineTB />
                <button className="analis-btn" onClick={() => setTB(!TB)}>
                  Пояснения &rarr;
                </button>
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
                      гипофосфатемии), внутреннего кровотечения или переливания
                      несовместимой крови (гемолитического шока)
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
                      происходит за счет неконъюгированного и прямого билирубина
                    </li>
                    <li>В результате паренхиматозного поражения печени</li>
                    <li>
                      Снижение поглощения билирубина гепатоцитами при анорексии
                      или голодании у лошадей. Концентрация общего билирубина у
                      здоровых лошадей может достигать 171 мкмоль/л (10 мг/дл)
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
                {normal.T_Cho[0] <= analyses.T_Cho &&
                normal.T_Cho[1] >= analyses.T_Cho ? (
                  <h3 style={{ color: "green" }}>Холестерин</h3>
                ) : (
                  <h3 style={{ color: "Gold" }}>Холестерин </h3>
                )}

                <ul>
                  <p>Референсные значения:</p>
                  <li style={{ listStyleType: "none" }}>Собаки: 3-7 ммоль/л</li>
                  <li style={{ listStyleType: "none" }}>Кошки: 2-4 ммоль/л</li>
                </ul>
                <ChartLineTCho />
                <button className="analis-btn" onClick={() => setTCho(!TCho)}>
                  Пояснения &rarr;
                </button>
                {TCho ? (
                  <ul className="list5b">
                    <h4>Повышение уровня:</h4>
                    <li>Снижение утилизации липопротеинов (гипотиреоидизм)</li>
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
                {normal.T_Pro[0] <= analyses.T_Pro &&
                normal.T_Pro[1] >= analyses.T_Pro ? (
                  <h3 style={{ color: "green" }}>Общий белок</h3>
                ) : (
                  <h3 style={{ color: "Gold" }}>Общий белок </h3>
                )}

                <ul>
                  <p>Референсные значения:</p>
                  <li style={{ listStyleType: "none" }}>Собаки: 50-100 г/л</li>
                  <li style={{ listStyleType: "none" }}>Кошки: 43-75 г/л</li>
                </ul>
                <ChartLineTP />
                <button className="analis-btn" onClick={() => setTP(!TP)}>
                  Пояснения &rarr;
                </button>
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
            </>
          ) : null}
        </div>
      </div>
    </>
  );
}

export default Blood
