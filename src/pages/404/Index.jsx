function Pagina404(props) {
  return (
    <Pagina>
      <Container className="text-center">
        <img
          src={error}
          alt="Erro 404"
          style={{ width: "25rem", height: "auto" }}
        />
        <h1 style={{ color: "grey" }}>Página Não Encontrada</h1>
        <h2 style={{ color: "grey" }}>
          A página que você está procurando não pôde ser encontrada
        </h2>
      </Container>
    </Pagina>
  );
}

export default Pagina404;
