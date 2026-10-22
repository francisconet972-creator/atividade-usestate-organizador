
import { useState } from "react";
import "./App.css";

function App() {
  const [texto, setTexto] = useState("");
  const [tarefas, setTarefas] = useState([]);
  const [filtro, setFiltro] = useState("todas");

  function adicionarTarefa(evento) {
    evento.preventDefault();

    const textoLimpo = texto.trim();

    if (textoLimpo === "") {
      return;
    }

    const novaTarefa = {
      id: Date.now(),
      texto: textoLimpo,
      concluida: false,
    };

    setTarefas((anteriores) => [...anteriores, novaTarefa]);
    setTexto("");
  }

  function alternarConclusao(id) {
    setTarefas((anteriores) =>
      anteriores.map((tarefa) =>
        tarefa.id === id
          ? { ...tarefa, concluida: !tarefa.concluida }
          : tarefa
      )
    );
  }

  function removerTarefa(id) {
    setTarefas((anteriores) =>
      anteriores.filter((tarefa) => tarefa.id !== id)
    );
  }

  function limparConcluidas() {
    setTarefas((anteriores) =>
      anteriores.filter((tarefa) => !tarefa.concluida)
    );
  }

  const total = tarefas.length;
  const concluidas = tarefas.filter(
    (tarefa) => tarefa.concluida
  ).length;
  const pendentes = total - concluidas;

  const tarefasVisiveis = tarefas.filter((tarefa) => {
    if (filtro === "pendentes") {
      return !tarefa.concluida;
    }

    if (filtro === "concluidas") {
      return tarefa.concluida;
    }

    return true;
  });

  return (
    <main className="pagina">
      <section className="organizador">
        <header className="cabecalho">
          <span className="etiqueta">MINHA ROTINA</span>
          <h1>Organizador de tarefas</h1>
          <p>Organize seu dia, uma tarefa de cada vez.</p>
        </header>

        <form className="formulario" onSubmit={adicionarTarefa}>
          <label htmlFor="nova-tarefa">O que você precisa fazer?</label>

          <div className="campo-tarefa">
            <input
              id="nova-tarefa"
              type="text"
              placeholder="Digite uma tarefa..."
              value={texto}
              onChange={(evento) => setTexto(evento.target.value)}
            />

            <button className="botao-adicionar" type="submit">
              + Adicionar
            </button>
          </div>
        </form>

        <section className="resumo" aria-label="Resumo das tarefas">
          <div className="resumo-item">
            <span>Total</span>
            <strong>{total}</strong>
          </div>

          <div className="resumo-item">
            <span>Pendentes</span>
            <strong>{pendentes}</strong>
          </div>

          <div className="resumo-item">
            <span>Concluídas</span>
            <strong>{concluidas}</strong>
          </div>
        </section>

        <section className="lista-section">
          <div className="titulo-lista">
            <h2>Minhas tarefas</h2>
            <span>{tarefasVisiveis.length} exibidas</span>
          </div>

          <nav className="filtros" aria-label="Filtrar tarefas">
            <button
              type="button"
              className={filtro === "todas" ? "ativo" : ""}
              onClick={() => setFiltro("todas")}
            >
              Todas
            </button>

            <button
              type="button"
              className={filtro === "pendentes" ? "ativo" : ""}
              onClick={() => setFiltro("pendentes")}
            >
              Pendentes
            </button>

            <button
              type="button"
              className={filtro === "concluidas" ? "ativo" : ""}
              onClick={() => setFiltro("concluidas")}
            >
              Concluídas
            </button>
          </nav>

          <ul className="lista-tarefas">
            {tarefasVisiveis.length === 0 ? (
              <li className="lista-vazia">
                <span className="icone-vazio">✓</span>
                <p>Nenhuma tarefa para exibir.</p>
                <span>Adicione uma tarefa para começar.</span>
              </li>
            ) : (
              tarefasVisiveis.map((tarefa) => (
                <li
                  className={`tarefa ${tarefa.concluida ? "concluida" : ""}`}
                  key={tarefa.id}
                >
                  <label className="tarefa-label">
                    <input
                      type="checkbox"
                      checked={tarefa.concluida}
                      onChange={() => alternarConclusao(tarefa.id)}
                    />

                    <span className="texto-tarefa">{tarefa.texto}</span>
                  </label>

                  <button
                    className="botao-remover"
                    type="button"
                    onClick={() => removerTarefa(tarefa.id)}
                    aria-label={`Remover tarefa: ${tarefa.texto}`}
                  >
                    Remover
                  </button>
                </li>
              ))
            )}
          </ul>

          {concluidas > 0 && (
            <button
              className="botao-limpar"
              type="button"
              onClick={limparConcluidas}
            >
              Limpar tarefas concluídas
            </button>
          )}
        </section>

        <footer className="rodape">
          <span>Pequenos passos também são progresso.</span>
        </footer>
      </section>
    </main>
  );
}

export default App;
