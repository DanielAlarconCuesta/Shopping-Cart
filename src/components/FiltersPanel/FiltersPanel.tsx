import React, { useEffect, useState } from "react";
import { useDispatch, useSelector  } from 'react-redux';

import { CompanyActionType } from '../../actions/CompanyActions';
import { TagActionType } from '../../actions/TagActions';
import { FilterTagActionType } from "../../actions/Filter/FilterTagActions";
import { FilterCompanyActionType } from "../../actions/Filter/FilterCompanyActions"

import Company from "../../interfaces/Company";
import CompanyServiceResult from "../../interfaces/CompanyServiceResult";
import FilterItem from "../../interfaces/FilterItem";
import FilterCardProps from "../../interfaces/props/FilterCardProps";
import TagServiceResult from "../../interfaces/TagServiceResult";

import CompanyService from "../../services/CompanyService/CompanyService";
import TagService from "../../services/TagService/TagService";

import { RootState } from '../../store';
import FilterCard from "../FilterCard/FilterCard";
import "./FiltersPanel.css";

function FiltersPanel() {

    const dispatch = useDispatch();
	const companies: Company[] = useSelector<RootState, Company[]>((state) => state.companies.companies);
    const tags: string[] = useSelector<RootState, string[]>((state) => state.tags.tags);

    const [companyFilterCardProps, setCompanyFilterCardProps] = useState<FilterCardProps>({
        title: "Brands",
        filterItems: [],
        searchPlaceholder: "Search brand"
    });

    const [tagFilterCardProps, setTagFilterCardProps] = useState<FilterCardProps>({
        title: "Tags",
        filterItems: [],
        searchPlaceholder: "Search tag"
    });

    useEffect(() => {
        fetchCompanies();
        fetchTags();
    }, []);

    useEffect(() => {
        prepareCompanyFilterItems(companies)
    }, [companies]);

    useEffect(() => {
        prepareTagFilterItems(tags)
    }, [tags])

    const fetchCompanies = (): void => {

        dispatch({
            type: CompanyActionType.GET_COMPANIES_PENDING
        });

		CompanyService.getCompanies()
		
			.then((companyServiceResult: CompanyServiceResult) => {

				if (!companyServiceResult.error && companyServiceResult.companies) {		
					dispatch({
						type: CompanyActionType.GET_COMPANIES_SUCCESS,
						payload: companyServiceResult.companies  
					});

				} else {
					dispatch({
						type: CompanyActionType.GET_COMPANIES_FAIL,
						payload: companyServiceResult.error
					});
				}
					
            }).catch((error: Error) => {
                dispatch({
                    type: CompanyActionType.GET_COMPANIES_FAIL,
                    payload: error
                });
            })
    }

    const fetchTags = (): void => {

        dispatch({
            type: TagActionType.GET_TAGS_PENDING
        });

		TagService.getTags()
		
			.then((tagServiceResult: TagServiceResult) => {

				if (!tagServiceResult.error && tagServiceResult.tags) {		
					dispatch({
						type: TagActionType.GET_TAGS_SUCCESS,
						payload: tagServiceResult.tags  
					});

				} else {
					dispatch({
						type: TagActionType.GET_TAGS_FAIL,
						payload: tagServiceResult.error
					});
				}
					
            }).catch((error: Error) => {
                dispatch({
                    type: TagActionType.GET_TAGS_FAIL,
                    payload: error
                });
            })
    }

    const prepareCompanyFilterItems = (companies: Company[]) => {

        if (!companies || !Array.isArray(companies)) {
            return;
        }

        const companyItems: FilterItem[] = [];

        companies.forEach((company) => {
            if (company 
                && company.name
                && company.slug
                ) {

                companyItems.push({
                    name: company.name,
                    id: company.slug,
                    checked: false
                })
            }
        });

        setCompanyFilterCardProps ((companyFilterCardProps) => ({
            ...companyFilterCardProps,
            filterItems: companyItems
        }));
    }

    const prepareTagFilterItems = (tags: string[]) => {

        if (!tags || !Array.isArray(tags)) {
            return;
        }

        const tagItems: FilterItem[] = [];

        tags.forEach((tag) => {
            if (tag) {
                tagItems.push({
                    name: tag,
                    id: tag,
                    checked: false
                })
            }
        });

        setTagFilterCardProps ((tagFilterCardProps) => ({
            ...tagFilterCardProps,
            filterItems: tagItems
        }));
    }

    const brandOnClickHandler = (filterItems: FilterItem[]): void => {
        
        let companies: string[] = filterItems.map((filterItem: FilterItem) => {
            return filterItem.id;
        })

        dispatch({
            type: FilterCompanyActionType.GET_FILTER_COMPANIES_SUCCESS,
            payload: companies
        });
    }

    const tagOnChangeHandler = (filterItems: FilterItem[]): void => {

        let tags: string[] = filterItems.map((filterItem: FilterItem) => {
            return filterItem.id;
        })

        dispatch({
            type: FilterTagActionType.GET_FILTER_TAGS_SUCCESS,
            payload: tags
        });
    }

    return (
        <div className="filtersPanel">

            <div className="filtersPanel-companyFilter">
                <FilterCard 
                    title={companyFilterCardProps.title}
                    filterItems={companyFilterCardProps.filterItems}
                    searchPlaceholder={companyFilterCardProps.searchPlaceholder}
                    onClickHandler={brandOnClickHandler}
                />
            </div>
            
            <div className="filtersPanel-tagFilter">
                <FilterCard 
                    title={tagFilterCardProps.title}
                    filterItems={tagFilterCardProps.filterItems}
                    searchPlaceholder={tagFilterCardProps.searchPlaceholder}
                    onClickHandler={tagOnChangeHandler}
                />
            </div>
        </div>
    )
}

export default FiltersPanel;
