import React from 'react';
import PropTypes from 'prop-types';
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';
import { Button } from '../Button';

export default function Carousel({ onFilter }) {
  const instaFilters = [
    { name: 'Sem filtro', value: 'none' },
    { name: '1977', value: 'filter-1977' },
    { name: 'Aden', value: 'filter-aden' },
    { name: 'Amaro', value: 'filter-amaro' },
    { name: 'Ashby', value: 'filter-ashby' },
    { name: 'Brannan', value: 'filter-brannan' },
    { name: 'Brooklyn', value: 'filter-brooklyn' },
    { name: 'Charmes', value: 'filter-charmes' },
    { name: 'Clarendon', value: 'filter-clarendon' },
    { name: 'Crema', value: 'filter-crema' },
    { name: 'Dogpatch', value: 'filter-dogpatch' },
    { name: 'Earlybird', value: 'filter-earlybird' },
    { name: 'Gingham', value: 'filter-gingham' },
    { name: 'Ginza', value: 'filter-ginza' },
    { name: 'Hefe', value: 'filter-hefe' },
    { name: 'Helena', value: 'filter-helena' },
    { name: 'Hudson', value: 'filter-hudson' },
    { name: 'Inkwell', value: 'filter-inkwell' },
    { name: 'Kelvin', value: 'filter-kelvin' },
    { name: 'Kuno', value: 'filter-juno' },
    { name: 'Lark', value: 'filter-lark' },
    { name: 'Lo-Fi', value: 'filter-lofi' },
    { name: 'Ludwig', value: 'filter-ludwig' },
    { name: 'Maven', value: 'filter-maven' },
    { name: 'Mayfair', value: 'filter-mayfair' },
    { name: 'Moon', value: 'filter-moon' },
    { name: 'Nashville', value: 'filter-nashville' },
    { name: 'Perpetua', value: 'filter-perpetua' },
    { name: 'Poprocket', value: 'filter-poprocket' },
    { name: 'Reyes', value: 'filter-reyes' },
    { name: 'Rise', value: 'filter-rise' },
    { name: 'Sierra', value: 'filter-sierra' },
    { name: 'Skyline', value: 'filter-skyline' },
    { name: 'Slumber', value: 'filter-slumber' },
    { name: 'Stinson', value: 'filter-stinson' },
    { name: 'Sutro', value: 'filter-sutro' },
    { name: 'Toaster', value: 'filter-toaster' },
    { name: 'Valencia', value: 'filter-valencia' },
    { name: 'Vesper', value: 'filter-vesper' },
    { name: 'Walden', value: 'filter-walden' },
    { name: 'Willow', value: 'filter-willow' },
    { name: 'X-Pro II', value: 'filter-xpro-ii' },
  ];

  const handleClick = (filter) => () => {
    onFilter(filter);
  };

  const filters = instaFilters.map((filter) => (
    <div
      className="item"
      style={{ width: '100%', display: 'flex', flexDirection: 'column' }}
    >
      <Button type="img" onClick={handleClick(filter.value)} ghost>
        <img
          src="/images/instagram-filter-example.jpg"
          alt="cachorro"
          style={{ height: '150px' }}
          className={filter.value}
          loading="lazy"
        />
      </Button>
      <div style={{ margin: 'auto' }}>{filter.name}</div>
    </div>
  ));

  return (
    <>
      <span>Escolha o filtro:</span>
      <AliceCarousel disableDotsControls infinite mouseTracking items={filters} />
    </>
  );
}

Carousel.defaultProps = {
  onFilter: undefined,
};

Carousel.propTypes = {
  onFilter: PropTypes.func,
};
