/********************************************************************************
** Form generated from reading UI file 'dialog_about.ui'
**
** Created by: Qt User Interface Compiler version 5.7.0
**
** WARNING! All changes made in this file will be lost when recompiling UI file!
********************************************************************************/

#ifndef UI_DIALOG_ABOUT_H
#define UI_DIALOG_ABOUT_H

#include <QtCore/QVariant>
#include <QtWidgets/QAction>
#include <QtWidgets/QApplication>
#include <QtWidgets/QButtonGroup>
#include <QtWidgets/QDialog>
#include <QtWidgets/QHeaderView>
#include <QtWidgets/QLabel>
#include <QtWidgets/QVBoxLayout>

QT_BEGIN_NAMESPACE

class Ui_Dialog_about
{
public:
    QVBoxLayout *verticalLayout;
    QLabel *label;

    void setupUi(QDialog *Dialog_about)
    {
        if (Dialog_about->objectName().isEmpty())
            Dialog_about->setObjectName(QStringLiteral("Dialog_about"));
        Dialog_about->resize(400, 300);
        verticalLayout = new QVBoxLayout(Dialog_about);
        verticalLayout->setObjectName(QStringLiteral("verticalLayout"));
        label = new QLabel(Dialog_about);
        label->setObjectName(QStringLiteral("label"));
        QFont font;
        font.setPointSize(18);
        label->setFont(font);
        label->setTextFormat(Qt::RichText);
        label->setAlignment(Qt::AlignCenter);

        verticalLayout->addWidget(label);


        retranslateUi(Dialog_about);

        QMetaObject::connectSlotsByName(Dialog_about);
    } // setupUi

    void retranslateUi(QDialog *Dialog_about)
    {
        Dialog_about->setWindowTitle(QApplication::translate("Dialog_about", "About", 0));
        label->setText(QApplication::translate("Dialog_about", "Boan", 0));
    } // retranslateUi

};

namespace Ui {
    class Dialog_about: public Ui_Dialog_about {};
} // namespace Ui

QT_END_NAMESPACE

#endif // UI_DIALOG_ABOUT_H
