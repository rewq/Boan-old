#-------------------------------------------------
#
# Project created by QtCreator 2016-09-28T03:26:57
#
#-------------------------------------------------

QT       += core gui

greaterThan(QT_MAJOR_VERSION, 4): QT += widgets

TARGET = Boan
TEMPLATE = app


SOURCES += main.cpp\
        mainwindow.cpp \
    dialog_about.cpp

HEADERS  += mainwindow.h \
    dialog_about.h

FORMS    += mainwindow.ui \
    dialog_about.ui

DISTFILES += \
    syntaxconf.astylerc
