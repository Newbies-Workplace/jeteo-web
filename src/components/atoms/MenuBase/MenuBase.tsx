import React from 'react';
import cs from 'classnames';
import { Portal } from 'react-portal';
import styles from './MenuBase.module.scss';

interface MenuBaseProp {
    isOpen: boolean
    setOpen: React.Dispatch<boolean>
    position?: "left" | "center" | "right"
    overlay?: boolean,
}

/**
 * @description
 * Universal wrapper for menus with build-in logic
 * @example
 * const [open, setOpen] = useState<boolean>(false);
 *
 * <Button onClick={() => setOpen(true)}>
 * <MenuBase
 *  isOpen={open}
 *  setIsOpen{setOpen}>
 *   <Content... />
 * </MenuBase>
 */
export const MenuBase: React.FC<MenuBaseProp> = ({
     isOpen,
     setOpen,
     position,
     overlay,
     children
}) => {

    return (
        <span>
            {isOpen &&
                <Portal>
                    <span
                        onClick={(e) => {
                            setOpen(false)
                            e.stopPropagation()
                        }}
                        className={cs(styles.overlay, {
                            [styles.visible]: overlay
                        })}/>
                </Portal>
            }
            <span className={styles.hook}>
                {isOpen &&
                    <div className={cs(styles.content, styles[`horizontal-${position}`])}>
                        {children}
                    </div>
                }
            </span>
        </span>
    );
};

MenuBase.defaultProps = {
    overlay: false,
    position: "center",
};