import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import {
  initAnalysesMonitorAC,
  initAnalysesMonitorListAC,
} from '../../utils/redux/actionCreators/actionCreators'
import ProfileNav from '../Profile/ProfileNav'
import DetailsMonitorAnalyse from '../DetailsMonitorAnalyse/DetailsMonitorAnalyse'
import ChartListHormonal from '../ChartList/ChartListHormonal'
import ChartLineMonitorGAS from '../ChartLineMonitor/ChartLineMonitorGAS'
import ChartLineMonitorACT from '../ChartLineMonitor/ChartLineMonitorACT'
import ChartLineMonitorALD from '../ChartLineMonitor/ChartLineMonitorALD'
import ChartLineMonitorINS from '../ChartLineMonitor/ChartLineMonitorINS'
import ChartLineMonitorPTH from '../ChartLineMonitor/ChartLineMonitorGAS'
import ChartLineMonitorCOR from '../ChartLineMonitor/ChartLineMonitorCOR'
import ChartLineMonitorT4 from '../ChartLineMonitor/ChartLineMonitorT4'

function Hormonal() {
  const [ACT, setACT] = useState(false);
  const [ALD, setALD] = useState(false);
  const [INS, setINS] = useState(false);
  const [PTH, setPTH] = useState(false);
  const [T4, setT4] = useState(false);
  const [COR, setCOR] = useState(false);
  const [GAS, setGAS] = useState(false);

  const { id } = useParams()
  const [state, setState] = useState(false)
  const text = useRef()
  const petState = useSelector((state) => state.petsReducer.pet)

  const index = petState.findIndex((el) => el._id === id)

  const [details, setDetails] = useState(false)

  const dispatch = useDispatch()

  useEffect(() => {
    fetch('http://localhost:4000/analyses/analysesmonitor', {
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
      .then((result) => {
        console.log('!!!!', result)
        dispatch(initAnalysesMonitorAC(result))
      })
  }, [])

  useEffect(() => {
    fetch('http://localhost:4000/analyses/listmonitor', {
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
      .then((data) => dispatch(initAnalysesMonitorListAC(data)))
    // .then((data) => console.log('data',data))
  }, [dispatch])

  const addHormonal = (ev) => {
    ev.preventDefault()
    const index = petState.findIndex((el) => el._id === id)
    const newHormonal = {
      spacies: petState[index].spacies,
      owner: id,
      date: text.current.date.value,
      ACT: text.current.ACT.value,
      ALD: text.current.ALD.value,
      INS: text.current.INS.value,
      PTH: text.current.PTH.value,
      T4: text.current.T4.value,
      COR: text.current.COR.value,
      GAS: text.current.GAS.value,
    };
    fetch('http://localhost:4000/addhormonal', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newHormonal),
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
              <h2>Гормональное исследование</h2>
            </div>
            <div style={{ marginBottom: "50px" }}>
              <ChartListHormonal />
            </div>

            <div onClick={() => setState(true)} className="pet-item-add">
              <p>Добавить анализ</p>
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
                    name="ACT"
                    type="number"
                    placeholder="ACT"
                    className="form-input"
                  />
                </div>
                <div className="form-item">
                  <input
                    name="ALD"
                    type="number"
                    placeholder="ALD"
                    className="form-input"
                  />
                </div>
                <div className="form-item">
                  <input
                    name="INS"
                    type="number"
                    placeholder="INS"
                    className="form-input"
                  />
                </div>
                <div className="form-item">
                  <input
                    name="PTH"
                    type="number"
                    placeholder="PTH"
                    className="form-input"
                  />
                </div>
                <div className="form-item">
                  <input
                    name="T4"
                    type="number"
                    placeholder="T4"
                    className="form-input"
                  />
                </div>
                <div className="form-item">
                  <input
                    name="COR"
                    type="number"
                    placeholder="COR"
                    className="form-input"
                  />
                </div>
                <div className="form-item">
                  <input
                    name="GAS"
                    type="number"
                    placeholder="GAS"
                    className="form-input"
                  />
                </div>
                <button onClick={addHormonal} className="form-buttom">
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
                <DetailsMonitorAnalyse />
                <div className="tests">
                  <h3>АКТГ (адренокортикотропный гормон) </h3>
                  <ul>
                    <p>Референсные значения:</p>
                    <li style={{ listStyleType: "none" }}>
                      Собаки: 10-80 пг/мл
                    </li>
                    <li style={{ listStyleType: "none" }}>
                      Кошки: 10-60 пг/мл
                    </li>
                  </ul>
                  <ChartLineMonitorACT />{" "}
                  <button onClick={() => setACT(!ACT)}>Пояснения &rarr;</button>
                  {ACT ? (
                    <ul className="list5b">
                      <h4>Повышение уровня:</h4>
                      <li>Гиперадренокортицизм (ГАК)</li>
                      <li>Первичный гипоадренокортицизм</li>
                      <li>Экзогенный АКТГ (в АКТГ-стимулирующем тесте)</li>
                      <h4>Понижение уровня:</h4>
                      <li>Опухоль надпочечников</li>
                      <li>Ятрогенная форма ГАК</li>
                      <li>Вторичный гипоадренокортицизм</li>
                    </ul>
                  ) : null}
                </div>
                <div className="tests">
                  <h3>Альдостерон </h3>
                  <ul>
                    <p>Референсные значения:</p>
                    <li style={{ listStyleType: "none" }}>
                      Собаки: 2–96 пг/мл
                    </li>
                    <li style={{ listStyleType: "none" }}>
                      Кошки: 7–105 пг/мл
                    </li>
                  </ul>
                  <ChartLineMonitorALD />
                  <button onClick={() => setALD(!ALD)}>Пояснения &rarr;</button>
                  {ALD ? (
                    <ul className="list5b">
                      <h4>
                        Результаты исследования содержат информацию
                        исключительно для врачей. Диагноз ставится на основании
                        комплексной оценки различных показателей и
                        дополнительных сведений.
                      </h4>
                      <li>
                        Концентрации альдостерона в плазме может быть на нижней
                        границе диапазона референсных значений у собак с
                        первичным гипоадренокортицизмом и может находиться в
                        пределах или ниже референсных значений у собак с
                        подозрением на атипичную форму гипоадренокортицизма.
                        Заметное повышение базовой концентрации альдостерона в
                        плазме предполагает развитие первичного
                        гиперальдостеронизма у собак, не имеющих другого
                        объяснения наличия у них гипокалиемии, гипернатриемии и
                        системной гипертензии. Выявление новообразования
                        надпочечника методом ультразвуковой диагностики будет
                        подтверждать диагноз.
                      </li>
                    </ul>
                  ) : null}
                </div>
                <div className="tests">
                  <h3>Инсулин </h3>
                  <ul>
                    <p>Референсные значения:</p>
                    <li style={{ listStyleType: "none" }}>
                      Собаки: 5-20 мкЕд/мл
                    </li>
                    <li style={{ listStyleType: "none" }}>
                      Кошки: 5-20 мкЕд/мл
                    </li>
                  </ul>
                  <ChartLineMonitorINS />
                  <button onClick={() => setINS(!INS)}>Пояснения &rarr;</button>
                  {INS ? (
                    <ul className="list5b">
                      <h4>Высокие значения:</h4>
                      <li>
                        Повышенное образование β-клеток поджелудочной железы и
                        высвобождение инсулина
                      </li>
                      <li>
                        Функционирующее новообразование из железы (инсулинома)
                      </li>
                      <li>Адекватный ответ на физиологическую гипергликемию</li>
                      <li>Наличие антител к инсулину</li>
                      <h4>Низкие значения:</h4>
                      <li>Патологическая гипоинсулинемия</li>
                      <li>
                        Снижение выработки инсулина в результате разрушения
                        β-клеток поджелудочной железы (СД 1типа)
                      </li>
                      <li>
                        Поздние стадии амилоидоза поджелудочной железы с
                        поражением β-клеток
                      </li>
                      <li>Физиологическая гипоинсулинемия</li>
                      <li>Наличие антител к инсулину</li>
                    </ul>
                  ) : null}
                </div>
                <div className="tests">
                  <h3>Паратиреоидный гормон (ПТГ) </h3>
                  <ul>
                    <p>Референсные значения:</p>
                    <li style={{ listStyleType: "none" }}>
                      Собаки: 19–123 пмоль/л
                    </li>
                    <li style={{ listStyleType: "none" }}>
                      Кошки: 1–38 пмоль/л
                    </li>
                  </ul>
                  <ChartLineMonitorPTH />
                  <button onClick={() => setPTH(!PTH)}>Пояснения &rarr;</button>
                  {PTH ? (
                    <ul className="list5b">
                      <h4>Повышение уровня:</h4>
                      <li>
                        Первичный гиперпаратиреоз (одновременное повышение iСa,
                        снижение P)
                      </li>
                      <li>
                        Вторичный гиперпаратиреоз (почечной этиологии)
                        (одновременное снижение iСa и повышение P)
                      </li>
                      <li>
                        Третичный гиперпаратиреоз (почечной этиологии)
                        (одновременное повышение и iСa, и P)
                      </li>
                      <li>
                        Вторичный алиментарный гиперпаратиреоз (одновременное
                        снижение iСa и повышение или снижение P)
                      </li>
                      <li>
                        Гипомагниемия (в нетипичных случаях, в результате
                        изменения рецепторного аппарата для ПТГ) (одновременное
                        снижение iСa и повышение P)
                      </li>
                      <h4>Понижение уровня:</h4>
                      <li>
                        Гиперкальциемия при злокачественных новообразованиях
                        (одновременное повышение iСa и снижение P)
                      </li>
                      <li>
                        Первичный гипопаратиреоз (одновременное снижение iСa и
                        повышение P)
                      </li>
                      <li>
                        Избыток витамина D (одновременное повышение и iСa, и P)
                      </li>
                      <li>
                        Гипоадренокортицизм собак (в нетипичных случаях)
                        (одновременное повышение и iСa, и P)
                      </li>
                    </ul>
                  ) : null}
                </div>
                <div className="tests">
                  <h3>Т4 общий (тироксин) </h3>
                  <ul>
                    <p>Референсные значения:</p>
                    <li style={{ listStyleType: "none" }}>
                      Собаки: 15–67 нмоль/л
                    </li>
                    <li style={{ listStyleType: "none" }}>
                      Кошки: 12–55 нмоль/л
                    </li>
                  </ul>
                  <ChartLineMonitorT4 />
                  <button onClick={() => setT4(!T4)}>Пояснения &rarr;</button>
                  {T4 ? (
                    <ul className="list5b">
                      <h4>Повышение уровня:</h4>
                      <li>
                        Ложные увеличение в связи с наличием аутоантител к Т4
                      </li>
                      <li>Передозировка левотироксина</li>
                      <li>
                        Функциональная карцинома щитовидной железы у собак
                        (редко)
                      </li>
                      <li>
                        Гипертиреоидизм, вызванный аденомой щитовидной железы
                        или аденоматозной гиперплазией
                      </li>
                      <h4>Понижение уровня:</h4>
                      <li>Первичный гипотиреоидизм</li>
                      <li>
                        Вторичный гипотиреоидизм (заболевания, не связанные с
                        патологией щитовидной железы, включая
                        гиперадренокортицизм; гипофизарная недостаточность)
                      </li>
                      <li>Применение некоторых лекарственных препаратов</li>
                      <li>
                        Предрасположенность у некоторых пород, таких как
                        золотистый ретривер, доберман пинчер, таксы, кокер
                        спаниель, доги, боксеры, пудели, немецкая овчарка,
                        далматин, ирландский сеттер, цвергшнауцер
                      </li>
                      <li>
                        После лечения гипертиреоидизма, введения радиоактивного
                        йода
                      </li>
                    </ul>
                  ) : null}
                </div>
                <div className="tests">
                  <h3>Кортизол </h3>
                  <ul>
                    <p>Референсные значения:</p>
                    <li style={{ listStyleType: "none" }}>
                      Собаки: 28-170 нмоль/л
                    </li>
                    <li style={{ listStyleType: "none" }}>
                      Кошки: 28-140 нмоль/л
                    </li>
                  </ul>
                  <ChartLineMonitorCOR />
                  <button onClick={() => setCOR(!COR)}>Пояснения &rarr;</button>
                  {COR ? (
                    <ul className="list5b">
                      <h4>Повышение уровня:</h4>
                      <li>Гиперадренокортицизм</li>
                      <li>Стресс</li>
                      <li>
                        Тяжелые заболевания, не связанные непосредственно с
                        патологией коры надпочечников
                      </li>
                      <li>
                        Прием лекарственных препаратов (преднизолона или других
                        стероидных гормонов)
                      </li>
                      <li>Повышение эстрогенов в крови (эструс)</li>
                      <li>Нарушение преаналитики</li>
                      <h4>Понижение уровня:</h4>
                      <li>Гипоадренокортицизм (в том числе ятрогенный)</li>
                      <li>Действие гестагенов</li>
                      <li>Нарушение преаналитики</li>
                    </ul>
                  ) : null}
                </div>
                <div className="tests">
                  <h3>Гастрин </h3>
                  <ul>
                    <p>Референсные значения:</p>
                    <li style={{ listStyleType: "none" }}>
                      Собаки: 0-100 мкЕд/мл
                    </li>
                    <li style={{ listStyleType: "none" }}>
                      Кошки: 0-18 мкЕд/мл
                    </li>
                  </ul>
                  <ChartLineMonitorGAS />
                  <button onClick={() => setGAS(!GAS)}>Пояснения &rarr;</button>
                  {GAS ? (
                    <ul className="list5b">
                      <h4>Повышение уровня:</h4>
                      <li>Гастринома</li>
                      <li>Спочечная недостаточность</li>
                      <li>
                        Хронический лимфоцитарно- плазмоцитарный энтерит (у
                        собак)
                      </li>
                      <li>Иммуно-пролиферативная энтеропатия у басенджи</li>
                      <li>
                        Ахлоргидрия (первичная или вторичная на фоне применения
                        антисекреторных препаратов)
                      </li>
                      <li>Гиперкальциемия</li>
                      <li>Взятие образца не натощак</li>
                      <li>Антральная G-клеточная гиперплазия</li>
                      <li>Атрофический гастрит</li>
                      <li>Дилатация/заворот желудка</li>
                      <li>Рак желудка</li>
                      <li>Обструкция привратника</li>
                      <li>Инфекция Helicobacter pylori</li>
                      <li>Гиперпаратиреоз</li>
                      <li>Заболевания печени</li>
                      <h4>Понижение уровня:</h4>
                      <li>Не имеют клинической значимости</li>
                    </ul>
                  ) : null}
                </div>
              </div>
            </>
          ) : null}
        </div>
      </div>
      {/* </div> */}
    </>
  );
}

export default Hormonal
