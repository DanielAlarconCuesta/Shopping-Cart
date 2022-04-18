import { combineReducers } from 'redux';

import { itemReducer } from './itemReducer';
import { filterCompanyReducer, filterTagReducer, filterSorterReducer, filterPaginationReducer } from './filterReducer';
import { companyReducer } from './companyReducer';
import { tagReducer } from './tagReducer';

const rootReducer = combineReducers({
  items: itemReducer,
  companies: companyReducer,
  tags: tagReducer,
  companyFilter: filterCompanyReducer,
  tagFilter: filterTagReducer,
  sortFilter: filterSorterReducer,
  paginationFilter: filterPaginationReducer
});

export default rootReducer;
