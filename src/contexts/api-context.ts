import React from 'react';
import { Api } from '../types/api';

export const ApiContext = React.createContext<Api>({} as Api);
