import React, { ChangeEvent, SyntheticEvent, useState } from "react";
import Navbar from "../../Navbar/Navbar";
import Search from "../../Search/Search";
import { CompanySearch } from "../../../company";
import { searchCompanies } from "../../../api";
import ListPortfolio from "../../Portfolio/ListPortfolio/ListPortfolio";
import CardList from "../../CardList/CardList";

type Props = {};

const SearchPage = (props: Props) => {
  const [search, setSearch] = useState<string>(""); // Ésto es un genérico que permite poner el tipo que se debe de pasar a la función, osa va a requerir que se pase un string
  const [searchResult, setSearchResult] = useState<CompanySearch[]>([]);
  const [serverError, setServerError] = useState<string | null>(null); // Le pasamos un string porque es lo que estamos obteniendo de vuelta de la API
  const [portfolioValues, setPortfolioValues] = useState<string[]>([]);

  // Cada que escribimos, se dispara un evento, y se dispara setSearch, es decir, se va guardando el estado del componente para no perderlo
  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    // Éste tipo de dato, lo saque haciendo hover sobre la "e" en el onChange, y lo pegué ahí para que la función solo acepte esos tipos de datos no hayan errores
    setSearch(e.target.value); // Acá se llega al input y se obtiene su value, con TS
  };

  // Se tuvo que quitar SyntheticEvent no se porque
  const onPortfolioCreate = (e: any) => {
    e.preventDefault(); // ésto es para que no se submitee el form y se pierdan todos nuestros datos
    const exists = portfolioValues.find((value) => value === e.target[0].value);
    if (exists) return;
    const updatedPortfolio = [...portfolioValues, e.target[0].value];
    setPortfolioValues(updatedPortfolio);
  };

  // Apagamos el TS porque es muy difícil averiguar qué dato es el que nos va a permitir eliminar
  const onPortfolioDelete = (e: any) => {
    e.preventDefault();
    const removed = portfolioValues.filter((value) => {
      return value !== e.target[0].value;
    });
    setPortfolioValues(removed);
  };

  // Sino conocemos el evento para ponerlo ene l tipo de dato, podemos traer un SyntheticEvent y ya ese acepta todos los eventos y igual proporciona type checking
  const onSearchSubmit = async (event: SyntheticEvent) => {
    event.preventDefault();
    const result = await searchCompanies(search); // ese "search", es del state que se va guardando cada cambio del formulario
    if (typeof result === "string") {
      setServerError(result);
    } else if (Array.isArray(result.data)) {
      setSearchResult(result.data);
    }
    console.log(result);
  };

  return (
    <div className="App">
      <Search
        onSearchSubmit={onSearchSubmit}
        search={search}
        handleSearchChange={handleSearchChange}
      />
      <ListPortfolio
        portfolioValues={portfolioValues}
        onPortfolioDelete={onPortfolioDelete}
      />
      {serverError && <h1>{serverError}</h1>}
      {/* esto hace que si tenemos en el state de serverError algo osa generalmente porque no hay internet, que se muestre */}
      <CardList
        searchResults={searchResult}
        onPortfolioCreate={onPortfolioCreate}
      />
    </div>
  );
};

export default SearchPage;
