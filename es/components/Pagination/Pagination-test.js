/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React from 'react';
import { iconChevronLeft, iconChevronRight } from 'carbon-icons';
import Icon from '../Icon';
import Pagination from '../Pagination';
import Select from '../Select';
import SelectItem from '../SelectItem';
import { shallow, mount } from 'enzyme';
jest.useFakeTimers();
describe('Pagination', function () {
  describe('renders as expected', function () {
    var pagination = shallow(React.createElement(Pagination, {
      className: "extra-class",
      pageSizes: [5, 10],
      totalItems: 50
    }));
    describe('icons', function () {
      var icons = pagination.find(Icon);
      it('should have 3 icons', function () {
        expect(icons.length).toEqual(2);
      });
      it('should use correct "backward" icon', function () {
        expect(icons.first().props().icon).toEqual(iconChevronLeft);
      });
      it('should use correct "forward" icon', function () {
        expect(icons.last().props().icon).toEqual(iconChevronRight);
      });
    });
    describe('pagination container', function () {
      it('should render the expected classes', function () {
        expect(pagination.hasClass('bx--pagination')).toBe(true);
        expect(pagination.hasClass('extra-class')).toBe(true);
      });
    });
    describe('pagination size container', function () {
      var left = pagination.find('.bx--pagination__left');
      it('should render a left container', function () {
        expect(left.length).toBe(1);
      });
      it('should have a size dropdown', function () {
        var select = left.find(Select);
        var items = select.find(SelectItem);
        expect(select.length).toBe(1);
        expect(items.length).toBe(2);
        expect(items.at(0).props().value).toBe(5);
        expect(items.at(1).props().value).toBe(10);
      });
      it('should label the dropdown', function () {
        var label = left.find('.bx--pagination__text').first();
        expect(label.text()).toBe('items per page | ');
      });
      it('should show the item range out of the total', function () {
        var label = left.find('.bx--pagination__text').at(1);
        expect(label.text()).toBe('1-5 of 50 items');
      });
      describe('pagination size container when total pages unknown', function () {
        var pager = mount(React.createElement(Pagination, {
          pageSizes: [5, 10],
          pagesUnknown: true
        }));
        var left = pager.find('.bx--pagination__left');
        it('should render a left container', function () {
          expect(left.length).toBe(1);
        });
        it('should have a size dropdown', function () {
          var select = left.find(Select);
          var items = select.find(SelectItem);
          expect(select.length).toBe(1);
          expect(items.length).toBe(2);
          expect(items.at(0).props().value).toBe(5);
          expect(items.at(1).props().value).toBe(10);
        });
        it('should label the dropdown', function () {
          var label = left.find('.bx--pagination__text').first();
          expect(label.text()).toBe('items per page | ');
        });
        it('should show the item range without the total', function () {
          var label = left.find('.bx--pagination__text').at(1);
          expect(label.text()).toBe('1-5 items');
        });
      });
      describe('pagination sizing', function () {
        it('should respond to page size changes', function () {
          var actualPageSize;

          var handler = function handler(_ref) {
            var pageSize = _ref.pageSize;
            actualPageSize = pageSize;
          };

          var pager = mount(React.createElement(Pagination, {
            pageSizes: [5, 10],
            totalItems: 50,
            onChange: handler
          }));
          expect(pager.state().pageSize).toBe(5);
          pager.find('select').simulate('change', {
            target: {
              value: 10
            }
          });
          expect(actualPageSize).toBe(10);
          expect(pager.state().pageSize).toBe(10); // Text updates after change

          var labels = pager.find('.bx--pagination__text');
          expect(labels.at(1).text()).toBe('1-10 of 50 items');
          expect(labels.at(2).text()).toBe('1 of 5 pages');
        });
        it('should reset the page when page size changes', function () {
          var actualPage;

          var handler = function handler(_ref2) {
            var page = _ref2.page;
            actualPage = page;
          };

          var pager = mount(React.createElement(Pagination, {
            pageSizes: [5, 10],
            totalItems: 50,
            onChange: handler
          }));
          pager.setState({
            page: 2
          });
          expect(pager.state().page).toBe(2);
          pager.find('select').simulate('change', {
            target: {
              value: 10
            }
          });
          expect(actualPage).toBe(1);
          expect(pager.state().page).toBe(1);
        });
        it('should return to first page on changes to pageSizes', function () {
          var pager = mount(React.createElement(Pagination, {
            pageSizes: [5, 10],
            totalItems: 50
          }));
          pager.setState({
            page: 2
          });
          pager.setProps({
            pageSizes: [3, 6]
          });
          expect(pager.state().page).toEqual(1);
        });
        it('should default to pageSize if pageSize is provided', function () {
          var pager = mount(React.createElement(Pagination, {
            pageSizes: [5, 10],
            pageSize: 10,
            totalItems: 50
          }));
          expect(pager.state().pageSize).toEqual(10);
        });
        it('should default to pageSize if on change to pageSize', function () {
          var pager = mount(React.createElement(Pagination, {
            pageSizes: [5, 10],
            totalItems: 50
          }));
          pager.setProps({
            pageSize: 10
          });
          expect(pager.state().pageSize).toEqual(10);
        });
      });
    });
    describe('pagination paging container', function () {
      var right = pagination.find('.bx--pagination__right');
      it('should render a right container', function () {
        expect(right.length).toBe(1);
      });
      it('should show the current page out of the total number of pages', function () {
        var label = right.find('.bx--pagination__text').first();
        expect(label.text()).toBe('1 of 10 pages');
      });
      it('should render ranges and pages for no items', function () {
        var pager = mount(React.createElement(Pagination, {
          pageSizes: [5, 10],
          totalItems: 0
        }));
        var labels = pager.find('.bx--pagination__text');
        expect(labels.at(1).text()).toBe('0-0 of 0 items');
        expect(labels.at(2).text()).toBe('1 of 1 pages');
      });
      it('should have two buttons for navigation', function () {
        var buttons = right.find('.bx--pagination__button');
        expect(buttons.length).toBe(2);
        expect(buttons.at(0).hasClass('bx--pagination__button--backward')).toBe(true);
        expect(buttons.at(1).hasClass('bx--pagination__button--forward')).toBe(true);
      });
      it('should disable backward navigation for the first page', function () {
        var buttons = right.find('.bx--pagination__button');
        expect(buttons.at(0).props().disabled).toBe(true);
        expect(buttons.at(1).props().disabled).toBe(false);
      });
      it('should disable forward navigation for the last page', function () {
        var smallPage = shallow(React.createElement(Pagination, {
          className: "extra-class",
          pageSizes: [100],
          totalItems: 50
        }));
        var buttons = smallPage.find('.bx--pagination__button');
        expect(buttons.at(0).props().disabled).toBe(true);
        expect(buttons.at(1).props().disabled).toBe(true);
      });
      describe('pagination paging container when total pages unknown', function () {
        var pager = mount(React.createElement(Pagination, {
          pageSizes: [5, 10],
          pagesUnknown: true
        }));
        var right = pager.find('.bx--pagination__right');
        it('should render a right container', function () {
          expect(right.length).toBe(1);
        });
        it('should show the current page without the total number of pages', function () {
          var label = right.find('.bx--pagination__text').first();
          expect(label.text()).toBe('page 1');
        });
        it('should have two buttons for navigation', function () {
          var buttons = right.find('.bx--pagination__button');
          expect(buttons.length).toBe(2);
          expect(buttons.at(0).hasClass('bx--pagination__button--backward')).toBe(true);
          expect(buttons.at(1).hasClass('bx--pagination__button--forward')).toBe(true);
        });
        it('should disable backward navigation for the first page', function () {
          var buttons = right.find('.bx--pagination__button');
          expect(buttons.at(0).props().disabled).toBe(true);
          expect(buttons.at(1).props().disabled).toBe(false);
        });
        it('should disable forward navigation for the last page', function () {
          var smallPage = shallow(React.createElement(Pagination, {
            pageSizes: [100],
            pagesUnknown: true,
            isLastPage: true
          }));
          var buttons = smallPage.find('.bx--pagination__button');
          expect(buttons.at(0).props().disabled).toBe(true);
          expect(buttons.at(1).props().disabled).toBe(true);
        });
        it('should hide text input if disabled', function () {
          var noTextInput = shallow(React.createElement(Pagination, {
            pageSizes: [100],
            pagesUnknown: true,
            pageInputDisabled: true
          }));
          var right = noTextInput.find('.bx--pagination__right .bx--text__input');
          expect(right.length).toEqual(0);
        });
      });
      describe('pagination navigation', function () {
        it('should go to the next page when clicking forward', function () {
          var actualPage;

          var handler = function handler(_ref3) {
            var page = _ref3.page;
            actualPage = page;
          };

          var pager = mount(React.createElement(Pagination, {
            pageSizes: [5, 10],
            totalItems: 50,
            onChange: handler
          }));
          expect(pager.state().page).toBe(1);
          pager.find('.bx--pagination__button--forward').simulate('click');
          expect(actualPage).toBe(2);
          expect(pager.state().page).toBe(2);
        });
        it('should go to the previous page when clicking backward', function () {
          var actualPage;

          var handler = function handler(_ref4) {
            var page = _ref4.page;
            actualPage = page;
          };

          var pager = mount(React.createElement(Pagination, {
            pageSizes: [5, 10],
            totalItems: 50,
            onChange: handler
          }));
          pager.setState({
            page: 2
          });
          expect(pager.state().page).toBe(2);
          pager.find('.bx--pagination__button--backward').simulate('click');
          expect(actualPage).toBe(1);
          expect(pager.state().page).toBe(1);
        }); // TODO: Skipping test as `jest.runAllTimers()` call here results in the
        // test being flakey. Should figure out what's going on here.

        xit('should jump to the page entered in the input field', function () {
          var actualPage;

          var handler = function handler(_ref5) {
            var page = _ref5.page;
            actualPage = page;
          };

          var pager = mount(React.createElement(Pagination, {
            pageSizes: [5, 10],
            totalItems: 50,
            onChange: handler
          }));
          expect(pager.state().page).toBe(1);
          pager.find('.bx--text__input').last().simulate('change', {
            target: {
              value: 2
            }
          });
          jest.runAllTimers();
          expect(actualPage).toBe(2);
          expect(pager.state().page).toBe(2);
        });
        it('should jump to page number if prop page is provided', function () {
          var pager = mount(React.createElement(Pagination, {
            pageSizes: [5, 10],
            totalItems: 50,
            page: 3
          }));
          expect(pager.state().page).toBe(3);
          pager.setProps({
            page: 2
          });
          expect(pager.state().page).toBe(2);
        });
        it('should not increment page if there is only 1 page', function () {
          var pager = mount(React.createElement(Pagination, {
            pageSizes: [10],
            totalItems: 5
          }));
          var buttons = pager.find('.bx--pagination__button');
          expect(buttons.at(1).props().disabled).toBe(true);
        });
      });
      describe('empty page input', function () {
        it('sets page to 0', function () {
          var pager = mount(React.createElement(Pagination, {
            pageSizes: [5, 10],
            totalItems: 50,
            page: 3
          }));
          pager.find('.bx--text__input').last().simulate('change', {
            target: {
              value: ''
            }
          });
          expect(pager.state().page).toBe(0);
        });
        it('uses default page text when current page 0', function () {
          var defaultMock = jest.fn();
          var pager = mount(React.createElement(Pagination, {
            pageSizes: [5, 10],
            totalItems: 50,
            page: 3,
            defaultPageText: defaultMock
          }));
          pager.find('.bx--text__input').last().simulate('change', {
            target: {
              value: 0
            }
          });
          expect(defaultMock).toBeCalledWith(10);
        });
        it('uses default item text when current page 0', function () {
          var defaultMock = jest.fn();
          var pager = mount(React.createElement(Pagination, {
            pageSizes: [5, 10],
            totalItems: 50,
            page: 3,
            defaultItemText: defaultMock
          }));
          pager.find('.bx--text__input').last().simulate('change', {
            target: {
              value: ''
            }
          });
          expect(defaultMock).toBeCalledWith(50);
        });
      });
    });
  });
});