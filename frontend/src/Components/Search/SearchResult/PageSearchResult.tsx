import React, {useEffect, useState} from 'react';

import { useParams } from 'react-router-dom';
import PulseLoader from "react-spinners/PulseLoader";

import { AbstractView } from '../../General/AbstractView'
import { SearchResultList } from './SearchResultList';
import Config from '../../../Utils/Config'
import { Paper } from '../../../Utils/GeneralTypes'

import './styles/PageSearchResult.sass';


export const PageSearchResult : React.FC = () => {
    let {query} = useParams<{query: string}>();
    const [activePage, setActivePage] = useState<number>(1);
    const [selected, setSelected] = useState<Paper>();
    const [searchResults, setSearchResults] = useState<{data: Paper[], pages: number, count: number}>();
    const PAGESIZE = 10;

    useEffect(() => {
        let requestURL = Config.base_url + '/api/search/?query=' + query + '&page=' + activePage + '&pagesize=' + PAGESIZE;

        fetch(requestURL)
            .then(res => res.json())
            .then(result => {
                setSearchResults({data: result.data, pages: result.max_pages, count: result.count});
            }).catch(() => console.log("Can't access " + requestURL));
    }, [query, activePage]);


    return (
        <div className='page-search-result'>
            {
                (searchResults == null) ? <div className="spinner"><PulseLoader/></div> :
                    (searchResults.data.length === 0) ? <h2 className="no-results">No results found</h2> :
                    (
                        <div className='wrapper' id='search-result-wrapper'>            
                            <div id='query-title'>
                                <h2>Showing {(PAGESIZE <= searchResults.count) ? PAGESIZE: searchResults.count} of {searchResults.count} results</h2>
                            <div className='line'>
                        </div>
                        </div>
                            <SearchResultList results={searchResults} activePage={activePage} raiseStateSelected={setSelected} raiseStateActivePage={setActivePage}/>
                        </div>
                    ) 
                
            }
            {(selected != null) && <AbstractView selected={selected}/>}
        </div>
    );
}

