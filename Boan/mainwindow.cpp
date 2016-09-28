#include "mainwindow.h"
#include "ui_mainwindow.h"

#include "dialog_about.h"

#include <QFileSystemModel>
#include <QTreeView>
#include <QStandardItemModel>

MainWindow::MainWindow(QWidget *parent) :
    QMainWindow(parent),
    ui(new Ui::MainWindow) {
    ui->setupUi(this);

    //QFileSystemModel *model = new QFileSystemModel;
    //model->setRootPath(QDir::currentPath());

    QStandardItemModel *model = new QStandardItemModel;
    QStandardItem *parentItem = model->invisibleRootItem();
    for (int i = 0; i < 4; ++i) {
        QStandardItem *item = new QStandardItem(QString("item %0").arg(i));
        parentItem->appendRow(item);
        parentItem = item;
    }

    ui->treeView->setModel(model);
    ui->treeView->show();
}

MainWindow::~MainWindow() {
    delete ui;
}

void MainWindow::on_actionAbout_triggered() {
    Dialog_about mDialog;
    mDialog.setModal(true);
    mDialog.exec();
}
