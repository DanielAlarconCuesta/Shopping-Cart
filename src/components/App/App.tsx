import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector  } from 'react-redux';

import AppProps from '../../interfaces/props/AppProps';
import Item from '../../interfaces/Item';
import ItemServiceResult from '../../interfaces/ItemServiceResult';
import ItemServiceQuery from '../../interfaces/ItemServiceQuery';

import Order from '../../enums/Order';
import Sort from '../../enums/Sort';

import ItemsPanel from '../ItemsPanel/ItemsPanel';
import FiltersPanel from '../FiltersPanel/FiltersPanel';

import ItemService from '../../services/ItemService/ItemService';
import { ItemActionType } from '../../actions/ItemActions';
import { RootState } from '../../store';
import './App.css';

function App(props: AppProps) {

	const dispatch = useDispatch();
	
	const items: Item[] = useSelector<RootState, Item[]>((state) => state.items.items);
	const filterTags: string[] | undefined = useSelector<RootState, string[] | undefined>((state) => state.tagFilter.filter.tags);
    const companyTags: string[] | undefined = useSelector<RootState, string[] | undefined>((state) => state.companyFilter.filter.manufacturers);

	let [itemServiceQuery, setItemServiceQuery] = useState<ItemServiceQuery>({
		itemFilter: {
			tags: [],
			manufacturers: []
		},
		pagination: {
			limit: 16,
			page: 1
		},
		itemSorter: {
			order: Order.desc,
			sort: Sort.price
		}
	});

	useEffect(() => {
		updateTagsQuery(filterTags);
    }, [filterTags]);

	useEffect(() => {
		updateCompaniesQuery(companyTags);
    }, [companyTags]);

	useEffect(() => {
		fetchItems();
	}, [itemServiceQuery])
  

	const updateTagsQuery = (tags: string[] = []) => {
		
		setItemServiceQuery({
			...itemServiceQuery,
			itemFilter: {
				...itemServiceQuery.itemFilter,
				tags: tags || []
			}
		})
	};

	const updateCompaniesQuery = (companies: string[] = []) => {

		setItemServiceQuery({
			...itemServiceQuery,
			itemFilter: {
				...itemServiceQuery.itemFilter,
				manufacturers: companyTags || [],
			}
		})
	}

  	const fetchItems = ():void => {

		dispatch({
			type: ItemActionType.GET_ITEMS_PENDING
		});

		ItemService.getItems(itemServiceQuery)
			.then((itemServiceResult: ItemServiceResult) => {

				if (!itemServiceResult.error && itemServiceResult.items) {			
					dispatch({
						type: ItemActionType.GET_ITEMS_SUCCESS,
						payload: itemServiceResult.items  
					});

				} else {
					dispatch({
						type: ItemActionType.GET_ITEMS_FAIL,
						payload: itemServiceResult.error
					});
				}
					
			}).catch((error: Error) => {
				dispatch({
					type: ItemActionType.GET_ITEMS_FAIL,
					payload: error
				});
			})
    }

  	return (
		<div className={`App ${props && props.className ? props.className : ""}`} >

			<div className="filterPanelDiv">
				<FiltersPanel />
			</div>

			<div className="itemsPanelDiv">
				<ItemsPanel items={items} />
			</div>

		</div>
  	);
}

export default App;
