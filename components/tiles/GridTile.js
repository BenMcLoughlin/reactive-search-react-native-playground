import React, { useState } from 'react';
import { scale, getScreenWidth } from '../../utils';
import styled from 'styled-components/native';
import { ActivityIndicator } from 'react-native-paper';
import { colors } from '../../themes/colors';
import { OnSale } from '../../screens/product/sections/OnSale';
import { SoldOut } from '../../screens/product/sections/SoldOut';
import { MaterialCommunityIcons as Icon } from '@expo/vector-icons';
import { Platform } from 'react-native';

export const GridTile = ({ product, onPress }) => {
    const { title, variants, images } = product;
    const margin = 14;
    const size = getScreenWidth() / 2;
    const width = Math.min(size - scale(margin) - scale(margin / 2.2), 250);

    const [loading, setLoading] = useState(true);

    const isFavourite = false;

    const lowestVariantPrice = Math.min(...product.variants.map((d) => d.price));
    const displayPrice = Math.max(product.original_price / 100, lowestVariantPrice);

    const isSoldOut = product.variants.every((d) => !d.available);

    return (
        <Card width={width} margin={margin}>
            <Container onPress={onPress}>
                {loading && (
                    <LoadingContainer>
                        <Loading size={40} animating={true} color={colors.brand.primaryAlt} />
                    </LoadingContainer>
                )}
                {product.is_on_sale && (
                    <Absolute>
                        <OnSale sale_ratio={product.sale_ratio} />
                    </Absolute>
                )}

                {isSoldOut && (
                    <AbsoluteBottom>
                        <SoldOut />
                    </AbsoluteBottom>
                )}
                <ImageWrapper loading={loading}>
                    <ImageBackground resizeMode="cover" source={{ uri: images[0]?.src }} onLoad={() => setLoading(false)} />
                </ImageWrapper>

                <Info>
                    <ProductName>{title}</ProductName>
                    <BusinessName>{product.business_name}</BusinessName>
                    <PriceCompare>
                        <SalePrice onSale={product.is_on_sale}>$ {displayPrice}</SalePrice>

                        {product.compare_at_price / 100 > displayPrice && <RegularPrice>$ {product.compare_at_price / 100}</RegularPrice>}
                    </PriceCompare>
                </Info>
                {isFavourite && <HeartIcon name="heart" size={24} color={colors.brand.tertiary} />}
            </Container>
        </Card>
    );
};

//  ----------------------------STYLES-------------------------------------------//

const Card = styled.View`
    background: ${colors.ui.white};
    border-radius: ${scale(8)}px;
    width: ${(p) => p.width}px;
    margin-top: ${(p) => p.margin}px;
    box-shadow: 2px 5px 15px ${Platform.OS === 'ios' ? colors.grey.medium : colors.grey.darker};
    elevation: 2;
    z-index: 2;
    height: 300px;
    margin: 5px;
`;
const Container = styled.TouchableOpacity`
    border-top-left-radius: ${scale(8)}px;
    border-top-right-radius: ${scale(8)}px;
    overflow: hidden;
    flex: 1;
`;

const ImageWrapper = styled.View`
    flex: 1.5;
    background: ${(p) => (p.loading ? 'transparent' : 'white')};
`;

const ImageBackground = styled.ImageBackground`
    flex: 1;
`;

const Info = styled.View`
    padding: ${scale(10)}px;
    justify-content: space-between;
    flex: 1;
`;

const ProductName = styled.Text`
    padding: 5px;
    flex: 4;
    width: 100%;
    font-size: ${scale(14)}px;
    color: ${colors.grey.darkest};
`;

const BusinessName = styled.Text`
    flex: 1;
    font-size: 12px;
    text-align: right;
`;
const PriceCompare = styled.View`
    flex-direction: row;
    flex: 1;
    flex-wrap: wrap;
`;
const RegularPrice = styled.Text`
    justify-content: space-between;
    text-align: center;
    text-decoration: line-through;
    font-size: ${scale(14)}px;
    font-weight: 200;
    color: ${colors.grey.darker};
    margin-left: 10px;
`;

const SalePrice = styled(RegularPrice)`
    text-decoration: none;
    color: ${(p) => (p.onSale ? colors.ui.red : colors.grey.darkest)};
    font-weight: 400;
`;

const Absolute = styled.View`
    position: absolute;
    top: -10px;
    right: -10px;
    elevation: 7;
    z-index: 7;
`;
const AbsoluteBottom = styled.View`
    position: absolute;
    top: 50%;
    left: -4px;
    elevation: 7;
    z-index: 7;
`;

const Loading = styled(ActivityIndicator)``;
const LoadingContainer = styled.View`
    height: 10%;
    padding-top: 55px;
    position: absolute;
    top: 20%;
    left: 45%;
    margin: 0 auto;
`;
const HeartIcon = styled(Icon)`
    position: absolute;
    top: 10px;
    left: 10px;
`;
