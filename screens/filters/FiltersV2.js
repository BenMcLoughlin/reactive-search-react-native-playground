import React from 'react';
import { Accordion } from '../../components/wrappers/Accordion';
import styled from 'styled-components/native';
import { scale } from '../../utils';
import { FiltersSelect } from './FiltersSelect';

export const FiltersV2 = () => {
    return (
        <Wrapper>
            <Accordion>
                <Panel title="Size">
                    <FiltersSelect id="size-filter" dataField="sizes.keyword" />
                </Panel>
                <Panel title="Categories">
                    <FiltersSelect id={'bucket-filter'} dataField="buckets.keyword" />
                </Panel>
                <Panel title="Storefront">
                    <FiltersSelect id={'store-filter'} dataField="business_name.keyword" />
                </Panel>
                <Panel title="Gender">
                    <FiltersSelect id={'gender-filter'} dataField="gender.keyword" />
                </Panel>
                <Panel title="Price Range"></Panel>
            </Accordion>
        </Wrapper>
    );
};

//  ----------------------------STYLES-------------------------------------------//
const Wrapper = styled.View`
    flex-direction: row;
    align-items: center;
    margin-left: ${scale(14)}px;
    justify-content: flex-end;
`;
const Panel = styled.View`
    position: relative;
    width: 100%;
    flex: 1;
    padding-bottom: 10px;
`;
